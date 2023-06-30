<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $table = 'contact';
    protected $guarded = ['id'];

    public function Store()
    {
        return $this->belongsTo(Store::class);
    }

    public function Users()
    {
        return $this->belongsTo(User::class);
    }

    public function WageBaseSalary()
    {
        return $this->belongsTo(WageBaseSalary::class);
    }

    public function WageSalaryUp()
    {
        return $this->hasMany(WageSalaryUp::class, 'contact_id');
    }
}
