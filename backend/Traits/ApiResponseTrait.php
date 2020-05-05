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

        header("HTTP/1.0 200 OK");
        echo json_encode($response);
    }
}