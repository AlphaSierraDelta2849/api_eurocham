<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules;

class RegisterController extends Controller
{

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function addUser(Request $request)
    {
        // $request->validate([
        //     'name' => ['required', 'string', 'max:255'],
        //     'email' => ['required', 'string', 'email', 'max:255', 'unique:'.User::class],
        //     'password' => ['required', 'confirmed', Rules\Password::defaults()],
        // ]);
        $user=User::where('email',$request->email)->first();
        if(NULL!==$user)
            return response()->json(['type'=>'failure','message'=>'ce mail est utilise par un autre utilisateur']);

            $folder_path = ('user-folders'. DIRECTORY_SEPARATOR . \sha1('rmk_user_' . $request->phone . '_dir'));

            try {
                if(Storage::exists($folder_path) && !Storage::deleteDirectory($folder_path)){
                    throw new \RuntimeException("Failed to delete directory {$folder_path} : " . \var_export(\error_get_last(), true));
                }
            }
            catch(\Exception $exception) {
                return redirect()->back()->withErrors([$exception->getMessage()]);
            }
            try {
                if(!Storage::makeDirectory($folder_path . DIRECTORY_SEPARATOR .
                    'media' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'avatars')){
                    throw new \RuntimeException("Failed to make directory {$folder_path} : " . \var_export(\error_get_last(), true));
                }
            }
            catch(\Exception $exception) {
                return redirect()->back()->withErrors([$exception->getMessage()]);
            }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id'  => 2,
            'folder_path'=> $folder_path,
            'siege' =>$request->siege,
            'siteweb' =>$request->siteweb,
            'phone' =>$request->phone
        ]);
        $user->save();
        return response()->json(['type'=>'success', 'message'=>'enrégistré avec succès',"user"=>$user],200);
    }
}
