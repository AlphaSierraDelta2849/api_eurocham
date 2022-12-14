<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttachedFiles extends Model
{
    use HasFactory;
    protected $fillable=[
        'avatar',
        'avatar_file_name',
        'folder_path',
        'post_id'
    ];
}
