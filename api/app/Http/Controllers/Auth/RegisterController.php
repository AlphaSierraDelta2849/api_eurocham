<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
        if(NULL!==User::where('email',$request->email)->first())
            return response()->json(['type'=>'failure','message'=>'ce mail est utilise par un autre utilisateur']);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id'  => 2,
            'siege' =>$request->siege,
            'siteweb' =>$request->siteweb,
            'phone' =>$request->phone
        ]);
        $user->save();
        return response()->json(['type'=>'success', 'message'=>'enrégistré avec succès'],200);
    }
}
