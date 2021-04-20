<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Symptom;
use App\Models\Treatment;
use App\Enums\Symptoms;
use App\Enums\Treatments;

class Post extends Model
{
    use Searchable;
    use HasFactory;


    public function toSearchableArray()
    {
        $array = $this->toArray();

        // Applies Scout Extended default transformations:
        $array = $this->transform($array);

        $tags = [];

        $symptoms = Symptoms::asArray();
        $treatments = Treatments::asArray();

        foreach (explode(',',$array['symptoms']) as $key => $value) {
            $tags[] = $symptoms[$value];
        }

        foreach (explode(',',$array['treatments']) as $key => $value) {
            $tags[] = $treatments[$value];
        }

        $array['_tags'] = $tags;
        // Add an extra attribute:
        // $array['added_month'] = substr($array['created_at'], 0, 7);

        return $array;
    }
}
