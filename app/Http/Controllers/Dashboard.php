<?php

namespace App\Http\Controllers;

use App\Models\Contact;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class Dashboard extends Controller
{

    public function index()
    {

        if ($contact = Contact::where('users_id', Auth::id())->with('store', 'users')->first()) {
            $storeActive = $contact['store']->active;
            $contactActive = $contact['active'];
        } else {
            $storeActive = null;
            $contactActive = null;
        }
        return Inertia::render('Dashboard', [
            ...dataUsers(),
            'storeActive' => $storeActive,
            'contactActive' => $contactActive
        ]);
    }
}
