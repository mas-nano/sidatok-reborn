<?php

namespace App\Traits;

use Ramsey\Uuid\Uuid as Generator;
use Ramsey\Uuid\Exception\UuidExceptionInterface;

trait Uuid
{
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            try {
                $model->uuid = Generator::uuid4()->toString();
            } catch (UuidExceptionInterface $th) {
                abort(500, $th->getMessage());
            }
        });
    }
}
