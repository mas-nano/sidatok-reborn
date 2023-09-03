<?php

namespace App\Traits;

use Illuminate\Support\Str;


trait UploadFile
{
    public function upload($path, $file)
    {
        $name = explode('.', $file->getClientOriginalName());
        $fullName = $name[0] . '_' . Str::random(5) . '.' . $file->getClientOriginalExtension();

        return $file->storeAs($path, $fullName);
    }
}
