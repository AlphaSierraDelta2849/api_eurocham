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
        'user_id'
    ];

    public function poster(){
        return $this->hasOne(User::class, 'id','user_id');
    }

    public function attachedFiles(){
        return $this->hasMany(AttachedFiles::class);
    }
}
