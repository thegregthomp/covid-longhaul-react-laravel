<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Symptom;
use App\Models\Treatment;

class Post extends Model
{
    use HasFactory;

    public function symptoms()
    {
        return $this->belongsToMany(Syptom::class);
    }

    public function treatments()
    {
        return $this->belongsToMany(Treatment::class);
    }
}
