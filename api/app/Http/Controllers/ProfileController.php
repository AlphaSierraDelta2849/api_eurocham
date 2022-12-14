<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\View\View
     */
    public function edit(Request $request)
    {
        return view('profile.edit', [
            'user' => $request->user(),
        ]);
    }

    /**
     * Update the user's profile information.
     *
     * @param  \App\Http\Requests\ProfileUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ProfileUpdateRequest $request)
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Delete the user's account.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
    
    public function updateEntreprise(Request $request)
    {
        // $request->validate([
        //     'avatar'                => ['nullable', 'image', 'mimes:jpeg,jpg,png', 'max:1024', 'dimensions:min_width=200,min_height=200'],
        //     'avatar_input_action'   => ['required', 'regex:#(none|changed|removed){1}#'],
        //     'name'                   => ['required', 'regex:#^[\p{L}]+[\p{L} ]*$|^[\p{L} ]+[\p{L}]+[\p{L} ]*$#u', 'max:255'],
        //     'siege'               => ['required', 'string', 'max:255'],
        //     'entreprise'            => ['nullable', 'string', 'max:255'],
        //     'siteweb'               => ['nullable', 'regex:#^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$#', 'max:255'],
        //     'phone'                 => ['required', 'regex:#(^3[3]|^7[5-80])[ ]?[0-9]{3}([ ]?[0-9]{2}){2}$#', 'exists:users']
        //     // 'password_confirmation' => ['required', Rules\Password::defaults()]
        // ]);
        $user = User::find($request->id);
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $avatar_file_name = (\sha1('eur_user_' . $user->name . '_avatar') . '.' . $avatar->getClientOriginalExtension());
            $img=Image::make($avatar);
            // dd($avatar);
            // Combiner le recadrage et le redimensionnement pour formater l'image de mani??re intelligente.

            $img->fit(300, 300, function ($constraint) {
                $constraint->upsize();  //  la contrainte pour emp??cher le surdimensionnement ind??sirable de l'image.
            }, 'center');

            // Conversion de l'image en base64 pour l'enregistrer dans la bd
            
            $image_to_base64 = (string)$img->encode("data-url");

            // Encode l'image actuelle dans un format et une qualit?? d'image donn??s et cr??e un nouveau flux PSR-7 bas?? sur les donn??es d'image.
            
            $img->stream($avatar->getClientOriginalExtension());

            // Suppression de l'ancien avatar du dossier.

            $this->deleteAvatarFile($user);

            // Enregistrer dans le dossier en tant que image.

            try {
                if(!Storage::put(($user->folder_path . DIRECTORY_SEPARATOR . $avatar_file_name), $img, 'public')){
                    throw new \RuntimeException("Failed to save image {$avatar->getClientOriginalName()} : " . \var_export(\error_get_last(), true));
                }
            }
            catch(\Exception $exception) {
                return redirect()->back()->withErrors([$exception->getMessage()]);
            }
            $user->avatar_file_name = $avatar_file_name;
            $user->avatar = $image_to_base64;
            $user->save();
        }
        else if(0 == \strcmp('removed', $request->avatar_input_action)) {
            // Suppression de l'avatar du dossier.

            $this->deleteAvatarFile($user);
            $user->avatar = null;
            $user->avatar_file_name = null;
        }
        
        // Mis ?? jour des donn??es de l'utilisateur.
        $user->update([
            'siege'       => $request->siege,
            'name' =>$request->name,
            'siteweb'       => $request->siteweb,
            'phone'=>$request->phone
        ]);
        return redirect()->back()->with(['success' => 'profil mis ?? jour avec succ??s !']);
    }
    protected function deleteAvatarFile(User $user)
    {
        if(isset($user->avatar_file_name)) {
            try {
                $file_path = ($user->avatarFolderPath() . DIRECTORY_SEPARATOR . $user->avatar_file_name);

                if(Storage::exists($file_path) && !Storage::delete($file_path)){
                    throw new \RuntimeException("Failed to delete file {$file_path} : " . \var_export(\error_get_last(), true));
                }
            }
            catch(\Exception $exception) {
                return redirect()->back()->withErrors([$exception->getMessage()]);
            }
        }
    }
    public function updatePassword(Request $request){
        $email = $request->email;
        $user = User::where('email', $email)->first();

        // V??rification du mot de passe actuel.
        
        if(!Hash::check($request['current_password'], $user->password)){
            return redirect()->back()->withErrors(['Le mot de passe saisi est incorrect !']);
        }

        // Mis ?? jour du mot de passe.

        $user->password = Hash::make($request->new_password);
        $user->save();

        return redirect()->back()->with(['success' => 'Votre mot de passe ?? ??t?? mis ?? jour avec succ??s !']);
    }
    public function updateEmail(Request $request){
        $email = $request->old_email;
        $user = User::where('email', $email)->first();

        // V??rification du nouveau mail.
        
        if(NULL===!User::where('email',$request->new_email)->first()){
            return redirect()->back()->withErrors(['Le mail saisi est d??j?? utilis?? par un autre utilisateur !']);
        }

        // Mis ?? jour du mot de passe.

        $user->email = $request->new_email;
        $user->save();

        return redirect()->back()->with(['success' => 'Votre mail ?? ??t?? mis ?? jour avec succ??s !']);
    }
}
