<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'titre',
        'contenu',
        'avatar',
        'avatar_file_name',
        'folder_path',
        'user_id'
    ];

    public function getPoster(){
        return $this->hasOne(User::class, 'id','user_id');
    }
}
