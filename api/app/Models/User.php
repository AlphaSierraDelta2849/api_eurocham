<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The different roles according to the user.
     */

    const ADMIN         = 1;
    const Entreprise	= 2;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'siteweb',
        'siege',
        'phone',
        'avatar',
        'avatar_file_name',
        'folder_path',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function posts(){
        return $this->hasMany(Post::class);
    }

    public function role(){
        return $this->hasOne(Role::class,'id','role_id');
    }
    public function hasAvatar() : bool
    {
        return (isset($this->avatar) && !empty($this->avatar));
    }
    /**
     * Get the user's avatar folder path.
     *
     * Note : This method must be called as a method with the () because it is different from the methods of Eloquent.
     *
     * @return string
     */

    public function avatarFolderPath() : string
    {
        return ((empty($this->folder_path)) ? $this->folder_path :
            (string)($this->folder_path . DIRECTORY_SEPARATOR .
            'media' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'avatars'));
    }

}
