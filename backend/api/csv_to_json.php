<?php

require "../vendor/autoload.php";

use Constants\Constants;
use Traits\ApiResponseTrait;
use Traits\ApiExceptionTrait;
use Rakit\Validation\Validator;
use Traits\FileProcessTrait;
use Utilities\Common;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


class Main
{
    use ApiExceptionTrait, ApiResponseTrait, FileProcessTrait;

    public function validate($data)
    {
        $validator = new Validator;

        $validation = $validator->make($data, [
            'file' => 'required|mimes:csv|uploaded_file'
        ]);

        $validation->validate();

        if ($validation->fails()) {
            // handling errors
            $errors = $validation->errors();
            return $errors->firstOfAll();
        } else {
            // validation passes
            return true;
        }
    }

    private function convert($csv_datas)
    {
        $headers = [];

        try {
            foreach ($csv_datas[0] as $key => $header) {
                $tmp_title = str_replace(" ", "_", trim(strtolower($header)));

                array_push($headers, $tmp_title);
            }

            unset($csv_datas[0]);
            $tmp_array = [];
            foreach ($csv_datas as $values) {
                $tmp_values = [];
                foreach ($values as $key => $value) {
                    $tmp_values[$headers[$key]] = $value;
                }

                array_push($tmp_array, $tmp_values);
            }


            $folder_path = "../public/files/json";
            $file = $this->create_json($folder_path,rand());

            $this->saveJsonToFile(
                json_encode($tmp_array,JSON_PRETTY_PRINT),
                $file,$folder_path
            );

            $full_path = $folder_path . '/'.$file;
            $file_size = filesize($full_path);

            return [$full_path,$file_size];

        } catch (Exception $ex) {
            $exceptions =  new Exception(json_encode($ex->getMessage()), 2001);
            $this->handleApiException($exceptions, 500);
        }
    }

    public function process($files)
    {
        $validation_status = $this->validate($files);

        if ($validation_status === true) {

            $csv = file_get_contents($files['file']['tmp_name']);
            $csv_datas = array_map("str_getcsv", explode("\n", $csv));

            list($full_path,$file_size) = $this->convert($csv_datas);

            $path = str_replace("..", "", $full_path);
            $path = Constants::SITE_URL . $path;

            $data = [
                'file_path' => $path,
                'file_size' => Common::convert_to_mb($file_size)
            ];

            $message = "Desire Json formate";

            $this->successResponse($message, $data);

        } else {
            $exceptions =  new Exception(json_encode($validation_status), 2000);
            $this->handleApiException($exceptions, 422);
        }
    }
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $mainObj = new Main();
    $mainObj->process($_FILES);
}
