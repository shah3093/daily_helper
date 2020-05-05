<?php

namespace Traits;


trait ApiResponseTrait
{
    public function successResponse($message,$data)
    {
        $response = [
            'status' => 5000,
            'message' => $message,
            'data' => $data
        ];

        header("HTTP/1.0 200");
        echo json_encode($response);
    }
}