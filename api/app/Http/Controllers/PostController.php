<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function get(){
        $posts=Post::all();
        return response()->json($posts,200);
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

    public function listpost()
    {
        //
        $a= Post ::all();
        return view('posts.list',compact('a'));
    }
    
    public function detailpost($id)
    {
        //
       $a=Post ::find($id);
       return view('posts.details',compact('a'));
       
    }

    public function search()
    {
        //
         $search_text = $_GET['query'];
        $a = Post::where('titre','LIKE', '%'.$search_text.'%')->get();

        return view('posts.search',compact('a'));
    }

}
