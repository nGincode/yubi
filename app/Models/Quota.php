<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quota extends Model
{
    use HasFactory;

    protected $table = 'quota';
    protected $guarded = ['id'];


    public function Contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function Store()
    {
        return $this->belongsTo(Store::class);
    }
}
