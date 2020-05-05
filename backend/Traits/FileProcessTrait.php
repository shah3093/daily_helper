<?php

namespace Traits;

trait FileProcessTrait
{
    public function create_json($folders,$file_name)
    {
        $filename = $file_name . "_" . time() . ".json";
        $handle = @fopen(($folders.'/' . $filename), 'w+');
        return $filename;
    }
    
    public function create_csv($folders,$file_name)
    {
        $filename = $file_name . "_" . time() . ".csv";
        $handle = @fopen(($folders.'/' . $filename), 'w+');
        return $filename;
    }

    public function load_Json($folders,$file_name)
    {
        $path = $folders."/" . $file_name;
        $json = json_decode(file_get_contents($path), true);
        return $json;
    }

    public function saveJsonToFile($data, $filename,$folders)
    {


        // read the file if present

        $handle = @fopen(($folders.'/' . $filename), 'r+');


        if ($handle) {
            // seek to the end
            fseek($handle, 0, SEEK_END);

            // are we at the end of is the file empty
            if (ftell($handle) > 0) {
                // move back a byte
                fseek($handle, -1, SEEK_END);
                // add the trailing comma
                fwrite($handle, ',', 1);

                // add the new json string
                fwrite($handle, $data . ']');
            } else {
                // write the first event inside an array
                fwrite($handle, '[' . $data . ']');
            }

            // close the handle on the file
            fclose($handle);
        }
    }

}