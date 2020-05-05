<?php

require "../vendor/autoload.php";

use Constants\Constants;
use Traits\ApiResponseTrait;
use GuzzleHttp\Client;
use Traits\ApiExceptionTrait;
use Rakit\Validation\Validator;
use Symfony\Component\DomCrawler\Crawler;
use Utilities\Common;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


class Main
{

    use ApiExceptionTrait, ApiResponseTrait;


    private function validate($url)
    {

        $data['url'] = $url;

        $validator = new Validator;

        $validation = $validator->make($data, [
            'url' => 'required|url'
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

    private function scrap_images($url)
    {
        try {

            $folder_name = rand();
            $path = "../public/files/img/" . $folder_name;
            mkdir($path);


            $client = new Client();
            $response = $client->request("GET", $url);
            $response_html = (string) ($response->getBody());
            $crawler = new Crawler($response_html);

            $node_values = $crawler->filter("img")->each(function (Crawler $node, $i) use ($path) {
                $url =  $node->attr('src');
                try {
                    if (!empty($url)) {
                        $file = @file_get_contents($url);
                        if ($file !== false) {
                            $file_name = basename($url);
                            $path = $path . "/" . $file_name;
                            @file_put_contents($path, $file);
                        }
                    }
                } catch (Exception $ex) {
                    // print_r($ex->getMessage());
                }
            });

            $zip = new ZipArchive;
            $res = $zip->open($path . '.zip', ZipArchive::CREATE);

            $img_file = 0;

            if ($res === TRUE) {
                foreach (glob($path . "/*") as $file) {
                    $zip->addFile($file, basename($file));
                    $img_file++;
                }
            } else {
                // exit("cannot open myzip.zip \n");
            }

            $zip->close();

            array_map('unlink', glob($path . "/*"));
            rmdir($path);

            $file_size = filesize($path . '.zip');



            return [$path . '.zip',$img_file,$file_size];
        } catch (Exception $ex) {

            // print_r($ex->getMessage());

            $exceptions = new Exception(json_encode($ex->getMessage()), 3000);
            $this->handleApiException($exceptions, 500);
        }
    }

   

    public function process($query)
    {
        $url = str_replace("url=", "", $query);
        $validation_status = $this->validate($url);

        if ($validation_status === true) {
            list($path,$img_file,$file_size) = $this->scrap_images($url);

            $path = str_replace("..", "", $path);
            $path = Constants::SITE_URL . $path;

            $data = [
                'file_path' => $path,
                'total_img' => $img_file,
                // 'file_size' => $this->convert_to_mb($file_size)
                'file_size' => Common::convert_to_mb($file_size)
            ];

            $message = "Desire website images in Zip formate";

            $this->successResponse($message, $data);
        } else {
            $exceptions =  new Exception(json_encode($validation_status), 2000);
            $this->handleApiException($exceptions, 422);
        }
    }
}



$uri = parse_url($_SERVER['REQUEST_URI']);
// $uri = explode( '/', $uri );

// print_r($uri);

$mainObj = new Main();
$mainObj->process($uri['query']);
