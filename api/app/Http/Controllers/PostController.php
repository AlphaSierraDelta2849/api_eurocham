<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function get(){
        $posts=Post::with('poster','attachedFiles')->get();
        return $posts->toJson();
    }
    public function add(Request $request){
        $folder_path = ('user-folders'. DIRECTORY_SEPARATOR . \sha1('rmk_user_' .$request->user_id . '_dir'));
        $post=Post::create([
            'titre' => $request->title,
            'contenu' => $request->content,
            'folder_path' => $folder_path,
            'user_id' => $request->user_id
        ]);

        return response()->json(['success'=>'true','message'=>'post ajouté avec succès'],200);
    }

    public function index()
    {
        //
        $p = Post ::all();
        return view('post.index',compact('p'));
    }

}
