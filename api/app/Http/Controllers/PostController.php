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
        $path = Storage::putFile('image', $request->avatar);
        $post=Post::create([
            'titre' => $request->title,
            'contenu' => $request->content,
            'avatar' => $path,
            'user_id' => $request->user_id
        ]);
        return response()->json(['success'=>'true','message'=>'post ajouté avec succès'],200);
    }

    public function listpost()
    {
        //
        $a = Post ::all();
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
         $a = Post ::where('titre','LIKE', '%'.$search_text.'%')->get();
        return view('posts.search',compact('a'));

        
    }

}
