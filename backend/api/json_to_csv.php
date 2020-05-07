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
            'file' => 'required|mimes:json|uploaded_file'
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

    public function convert($json_datas)
    {
        $folder_path = "../public/files/csv";
        $file = $this->create_csv($folder_path, rand());
        $full_path = $folder_path . '/' . $file;

        try {
            $fp = fopen($full_path, 'w');
            $header = false;
            foreach ($json_datas as $row) {
                try {
                    if (empty($header)) {
                        $header = array_keys($row);
                        fputcsv($fp, $header);
                        $header = array_flip($header);
                    }
                    @fputcsv($fp, array_merge($header, $row));
                } catch (Exception $ex) {
                    //throw $th;
                }
            }
            fclose($fp);


            $file_size = filesize($full_path);

            return [$full_path, $file_size];
        } catch (Exception $ex) {
            //throw $th;
        }
    }

    public function process($files)
    {
        $validation_status = $this->validate($files);

        if ($validation_status === true) {

            $json = file_get_contents($files['file']['tmp_name']);
            $json_datas = json_decode($json, true);

            list($full_path, $file_size) = $this->convert($json_datas);

            $path = str_replace("..", "", $full_path);
            $path = Constants::SITE_URL . $path;

            $data = [
                'file_path' => $path,
                'file_size' => Common::convert_to_mb($file_size)
            ];

            $message = "Desire CSV formate";

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
