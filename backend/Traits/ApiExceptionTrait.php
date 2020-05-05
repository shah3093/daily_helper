<?php

namespace Traits;

use Exception;

trait ApiExceptionTrait
{
    function handleApiException(Exception $exception,$status_code)
    {

        $response['error']['code'] = $exception->getCode();

        switch ($status_code) {
            case 422:
                $response['error']['message'] = json_decode($exception->getMessage());
                break;
            default:
                $response['error']['message'] = json_decode($exception->getMessage());
                break;
        }

        header("HTTP/1.0 ".$status_code." Not Found");
        echo json_encode($response);
    }
}
