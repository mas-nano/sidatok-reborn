<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shop extends Model
{
    use HasFactory, Uuid;

    protected $guarded = ['id'];

    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }
}
