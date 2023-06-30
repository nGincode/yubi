<?php

use App\Models\Contact;
use App\Models\GroupsUsers;
use App\Models\Quota;
use App\Models\Store;

use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Str;

function rupiah($val)
{
    return "Rp " . number_format($val, 0, '.', ',');
}

function num_to_letters($n)
{
    $n -= 1;
    for ($r = ""; $n >= 0; $n = intval($n / 26) - 1)
        $r = chr($n % 26 + 0x41) . $r;
    return $r;
}

function createDateRangeArray($mulai, $selesai)
{
    $result = array();
    $dari   = mktime(1, 0, 0, substr($mulai, 5, 2), substr($mulai, 8, 2), substr($mulai, 0, 4));
    $sampai = mktime(1, 0, 0, substr($selesai, 5, 2), substr($selesai, 8, 2), substr($selesai, 0, 4));
    if ($sampai >= $dari) {
        array_push($result, date('Y-m-d', $dari));
        while ($dari < $sampai) {
            $dari += 86400;
            array_push($result, date('Y-m-d', $dari));
        }
    }
    return $result;
}

function dataUsers()
{
    $id_users = Auth::id();
    $groups = GroupsUsers::where('users_id', $id_users)->with('Groups')->first();
    $contact = Contact::where('users_id', $id_users)->with('store', 'users')->first();
    if ($groups && $contact) {
        if ($contact['store']->active === 'True' && $contact['active'] === 'True') {
            $permission = unserialize($groups['groups']->permission);
        } else {
            $permission = [];
        }
    } else if ($groups) {
        $permission = unserialize($groups['groups']->permission);
    } else {
        $permission = [];
    }

    $quota = 0;
    $redeem = 0;
    if ($dtQuota = Quota::where('users_id', $id_users)->first()) {
        $calQuota = 0;
        if ($contact) {
            $calQuota += $contact['free_voucher'];
        }

        if ($calQuota !== $dtQuota['value']) {
            Quota::where('id', $dtQuota['id'])->update([
                'value' => $calQuota,
            ]);
        }

        $quota += $calQuota - $redeem;
    } else {
        if ($contact) {
            Quota::create([
                'uuid' => Str::uuid(),
                'contact_id' => $contact['id'],
                'store_id' => $contact['store']->id,
                'users_id' => $id_users,
                'division' => $contact['division'],
                'value' => $contact['free_voucher'] ?? 0,
                'created_at' => date('Y-m-d H:i:s')

            ]);
        }
    };


    $storeActiveSelect = [];
    foreach (Store::where('active', 'True')->get() as  $value) {
        $storeActiveSelect[] = ['value' => $value['uuid'], 'label' => $value['name']];
    }

    return ['csrf_token' => csrf_token(), 'groups' => $groups, 'permission' => $permission, 'contact' => $contact, 'quota' => $quota, 'quotaRp' => rupiah($quota), 'selectStore' => $storeActiveSelect];
}

function unit()
{
    return  [
        ["value" => "cm", "label" => "centimeter (cm)"],
        ["value" => "c", "label" => "cup (c)"],
        ["value" => "fl oz", "label" => "fluid ounce (fl oz)"],
        ["value" => "gal", "label" => "gallon (gal)"],
        ["value" => "g", "label" => "gram (g)"],
        ["value" => "in", "label" => "inch (in)"],
        ["value" => "kg", "label" => "kilogram (kg)"],
        ["value" => "l", "label" => "litre (l)"],
        ["value" => "m", "label" => "meter (m)"],
        ["value" => "mg", "label" => "milligram (mg)"],
        ["value" => "ml", "label" => "millilitre (ml)"],
        ["value" => "oz", "label" => "ounce (oz)"],
        ["value" => "pcs", "label" => "pieces (pcs)"],
        ["value" => "pint", "label" => "pint (pt)"],
        ["value" => "lb", "label" => "pound (lb)"],
        ["value" => "q", "label" => "quart (q)"],
        ["value" => "tbsp", "label" => "tablespoon (tbsp)"],
        ["value" => "tsp", "label" => "teaspoon (tsp)"],
        ["value" => "pck", "label" => "pack (pck)"],
        ["value" => "ikt", "label" => "ikat (ikt)"],
        ["value" => "btg", "label" => "batang (btg)"],
        ["value" => "bks", "label" => "bungkus (bks)"],
        ["value" => "sct", "label" => "sachet (sct)"],
        ["value" => "tn", "label" => "ton (tn)"],
        ["value" => "kw", "label" => "kwintal (kw)"],
        ["value" => "btl", "label" => "botol (btl)"],
        ["value" => "prs", "label" => "portion (prs)"],
        ["value" => "ktn", "label" => "karton (ktn)"],
        ["value" => "krg", "label" => "karung (krg)"],
        ["value" => "crt", "label" => "krat (crt)"],
        ["value" => "box", "label" => "box (box)"],
        ["value" => "bal", "label" => "bal (bal)"],
        ["value" => "lsn", "label" => "lusin (lsn)"],
        ["value" => "ekr", "label" => "ekor (ekr)"],
        ["value" => "kds", "label" => "kardus (kds)"],
        ["value" => "ptg", "label" => "potong (ptg)"],
        ["value" => "btr", "label" => "butir (btr)"],
        ["value" => "ons", "label" => "ons (ons)"],
        ["value" => "grp", "label" => "gros (grs)"],
        ["value" => "lbr", "label" => "lembar (lbr)"],
        ["value" => "klg", "label" => "kaleng (klg)"],
        ["value" => "whl", "label" => "whole (whl)"],
        ["value" => "jar", "label" => "jar (jar)"],
        ["value" => "bbl", "label" => "barrel (bbl)"],
    ];
}

function imageUpload($files, $imageName)
{


    $lebar_gambar = Image::make($files)->width();
    $lebar_gambar -= $lebar_gambar * 50 / 100;

    Image::make($files)->resize($lebar_gambar, null, function ($constraint) {
        $constraint->aspectRatio();
    })->save(public_path($imageName));
}
