<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionUsers extends Model
{
    use HasFactory;
    protected $guarded = [];
    // protected $fillable = [
    //     'token',
    //     'refresh_token',
    //     'token_expried',
    //     'user_id',
    //     'refresh_token_expried'
    // ];
}