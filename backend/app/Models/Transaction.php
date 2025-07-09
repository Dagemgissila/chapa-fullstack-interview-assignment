<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    //
    protected $fillable = [
        'user_id',
        'currency',
        'amount',
        'status',
        'reference',
        'payment_method',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
