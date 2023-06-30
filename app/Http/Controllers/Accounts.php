<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\User;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class Accounts extends Controller
{
    public function Store()
    {
        return Inertia::render('AccountsStore', [
            ...dataUsers()
        ]);
    }

    public function Users()
    {
        return Inertia::render('AccountsUsers', [
            ...dataUsers()
        ]);
    }

    public function Groups()
    {
        $groupsUniqueSelect = [];
        foreach (User::with('GroupsUsers')->get() as $v) {
            if (!isset($v->GroupsUsers[0])) {
                $groupsUniqueSelect[] = ['value' => $v['uuid'], 'label' => $v['username']];
            }
        }

        return Inertia::render('AccountsGroups', [
            ...dataUsers(),
            'groupsUniqueSelect' => $groupsUniqueSelect
        ]);
    }

    public function Contact()
    {
        $storeActiveSelect = [];
        foreach (Store::where('active', 'True')->get() as  $value) {
            $storeActiveSelect[] = ['value' => $value['uuid'], 'label' => $value['name']];
        }


        return Inertia::render('AccountsContact', [
            ...dataUsers(),
            'storeActiveSelect' => $storeActiveSelect
        ]);
    }
}
