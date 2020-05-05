<?php

namespace Utilities;

class Common
{
    static function convert_to_mb($size)
    {
        $mb_size = $size / 1048576;
        $format_size = number_format($mb_size, 2) . ' MB';
        return $format_size;
    }
}
