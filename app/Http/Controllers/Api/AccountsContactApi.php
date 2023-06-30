<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Contact;
use App\Models\PresenceSchedule;
use App\Models\PresenceWorkPermit;
use App\Models\Store;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class AccountsContactApi extends Controller
{

    public function all(Request $request)
    {
        $action = $request->input('Action');


        $data = [];


        if ($action) {
            if (in_array('View', $action) || in_array('Create', $action) || in_array('Update', $action) || in_array('Delete', $action)) {
                $act = '<div class="dropdown ms-auto text-end"><a class="btn-link" data-bs-toggle="dropdown" aria-expanded="true"><svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></a><div class="dropdown-menu dropdown-menu-end" data-popper-placement="bottom-end" data-popper-reference-hidden="" style="margin: 0px; position: absolute; inset: 0px auto auto 0px; transform: translate(-160px, 26.4px);">';

                if (in_array('View', $action)) {
                    $act .= '<a class="dropdown-item" id="view"  data-bs-toggle="modal"
                data-bs-target=".bd-modal-lg"><i class="fa fa-eye"></i>  View</a>';
                }

                if (in_array('Create', $action)) {
                    $act .= '<a class="dropdown-item" id="create" data-bs-toggle="modal"
                data-bs-target=".bd-modal-lg" style="color:green"><i class="fa fa-plus"></i> Create</a>';
                }

                if (in_array('Update', $action)) {
                    $act .= '<a class="dropdown-item" id="update" data-bs-toggle="modal"
                data-bs-target=".bd-modal-lg" style="color:orange"><i class="fa fa-pencil"></i> Update</a>';
                }

                if (in_array('Delete', $action)) {
                    $act .= '<a class="dropdown-item" id="delete" data-bs-toggle="modal"
                data-bs-target=".bd-modal-lg" style="color:red" ><i class="fa fa-trash"></i> Delete</a>';
                }
                $act .= '</div></div>';
            } else {
                $act = '<i class="fa fa-minus"></i>';
            }
        }

        $database = Contact::where('delete', false)->with('Store', "Users")->orderBy('active', 'ASC')->orderBy('name', 'ASC')->get();



        foreach ($database as $key => $value) {
            $cuti = 0;

            $firtDate = new DateTime($value['date_of_entry']);
            $endDate = new DateTime(date('Y-m-d'));
            $totalCuti = $endDate->diff($firtDate);
            $cuti += $totalCuti->days  / 30 - 12;

            if ($action) {
                $data[] = [
                    'id' => $value['uuid'],
                    'img' => $value['img'] ? "<img src='" . $value['img'] . "' class='imgManage' >" : "<img src='assets/unamaed/unnamed.png' class='imgManage' >",
                    'name' => $value['name'] .  ($value['users'] ? "<br><small>@" . $value['users']->username . "</small>" : ''),
                    'entry' => date('d M Y', strtotime($value['date_of_entry'])),
                    'position' => $value['position'] . ' ' . $value['division'],
                    'whatsapp' => $value['whatsapp'],
                    'namestore' => $value['store']->name,
                    'store' => $value['store'] ? (['value' => $value['store']->id, 'label' => $value['store']->name]) : null,
                    'active' => $value['active'],
                    'cuti' =>  $cuti < 0 ? 0 : floor($cuti),
                    'action' => ($act ?? '') . ' voc : <small>' . rupiah($value['free_voucher']) . '</small>'
                ];
            } else {
                $data[] = [
                    'id' => $value['uuid'],
                    'img' => $value['img'] ? "<img src='" . $value['img'] . "' class='imgManage' >" : "<img src='assets/unamaed/unnamed.png' class='imgManage' >",
                    'name' => $value['name'] .  ($value['users'] ? "<br><small>@" . $value['users']->username . "</small>" : ''),
                    'position' => $value['position'] . ' ' . $value['division'],
                    'namestore' => $value['store']->name,
                    'whatsapp' => $value['whatsapp'],
                    'store' => $value['store'] ? (['value' => $value['store']->id, 'label' => $value['store']->name]) : null,
                    'entry' => date('d M Y', strtotime($value['date_of_entry'])),
                    'active' => $value['active'],
                ];
            }
        }

        return response()->json(
            [
                'response' => 'success',
                'message' => $data ? 'ok' : 'Not Value',
                'data' => $data
            ],
            200
        );
    }

    public function view(Request $request)
    {
        $id = $request->input('id');

        $users_id = $request->input('users_id');
        $store_id = $request->input('store_id');
        $startdate = $request->input('startdate');
        $enddate = $request->input('enddate');
        $schedule = $request->input('schedule');
        $active = $request->input('active');
        $historyStart = $request->input('historyStart');
        $historyEnd = $request->input('historyEnd');



        if ($id) {
            $value = Contact::where('uuid', $id)->where('delete', false)->with('Store', 'Users')->first();
            if ($value) {
                $data = [
                    'id' => $value['uuid'],
                    'name' => $value['name'],
                    'code' => $value['code '],
                    'date_of_birth' => $value['date_of_birth'],
                    'date_of_entry' => $value['date_of_entry'],
                    'birth_of_place' => $value['birth_of_place'],
                    'religion' => $value['religion'],
                    'gender' => $value['gender'],
                    'address' => $value['address'],
                    'whatsapp' => $value['whatsapp'],
                    'position' => $value['position'],
                    'division' => $value['division'],
                    'delete' => $value['delete'],
                    'active' => $value['active'],
                    'img' => $value['img'],
                    'store' => $value['store'] ? (['value' => $value['store']->uuid, 'label' => $value['store']->name]) : null,
                    'users' => $value['users'] ? (['value' => $value['users']->uuid, 'label' => $value['users']->username]) : null,
                    'free_voucher' => $value['free_voucher'],
                ];
            } else {
                $data = [];
            }

            return response()->json(
                [
                    'response' => 'success',
                    'message' => $data ? 'ok' : 'Nothing',
                    'data' => $data
                ],
                200
            );
        } else if ($users_id) {

            if ($usersDatas = User::where('uuid', $users_id)->first()) {
                if ($value = Contact::where('users_id', $usersDatas['id'])->where('delete', false)->with('Store', 'Users')->first()) {
                    $data = [
                        'id' => $value['uuid'],
                        'name' => $value['name'],
                        'code ' => $value['code '],
                        'date_of_birth' => $value['date_of_birth'],
                        'date_of_entry' => $value['date_of_entry'],
                        'birth_of_place' => $value['birth_of_place'],
                        'religion' => $value['religion'],
                        'gender' => $value['gender'],
                        'address' => $value['address'],
                        'whatsapp' => $value['whatsapp'],
                        'position' => $value['position'],
                        'division' => $value['division'],
                        'delete' => $value['delete'],
                        'active' => $value['active'],
                        'img' => $value['img'],
                        'store' => $value['store'] ? (['value' => $value['store']->uuid, 'label' => $value['store']->name]) : null,
                        'users' => $value['users'] ? (['value' => $value['users']->uuid, 'label' => $value['users']->username]) : null,
                    ];
                } else {
                    $data = [];
                }

                return response()->json(
                    [
                        'response' => 'success',
                        'message' => $data ? 'ok' : 'Nothing',
                        'data' => $data
                    ],
                    200
                );
            } else {
                return response()->json(
                    [
                        'response' => 'error',
                        'message' => 'Users not found'
                    ],
                    200
                );
            }
        } else {
            return response()->json(
                [
                    'response' => 'error',
                    'message' => 'Bad Request'
                ],
                200
            );
        }
    }

    public function delete(Request $request)
    {
        $id = $request->input('id');

        if ($id) {
            if (Contact::where('uuid', $id)->update(['delete' => true, 'users_id' => null])) {

                return response()->json(
                    [
                        'response' => 'success',
                        'message' => 'Deleted successfully',
                    ],
                    200
                );
            } else {
                return response()->json(
                    [
                        'response' => 'error',
                        'message' =>  'Database trauble'
                    ],
                    200
                );
            }
        } else {
            return response()->json(
                [
                    'response' => 'error',
                    'message' => 'Bad Request'
                ],
                400
            );
        }
    }

    public function update(Request $request)
    {
        $name = $request->input('nameUpdate');
        $date_of_birth = $request->input('date_of_birthUpdate');
        $birth_of_place = $request->input('birth_of_placeUpdate');
        $date_of_entry = $request->input('date_of_entryUpdate');
        $religion = $request->input('religionUpdate');
        $gender = $request->input('genderUpdate');
        $address = $request->input('addressUpdate');
        $whatsapp = $request->input('whatsappUpdate');
        $position = $request->input('positionUpdate');
        $division = $request->input('divisionUpdate');
        $store = $request->input('storeUpdate');
        $active = $request->input('activeUpdate');
        $account = $request->input('accountUpdate');
        $free_voucher = $request->input('free_voucherUpdate');

        $id = $request->input('id');
        $imgDel = $request->input('imgDel');

        if ($id && $name && $store && $date_of_birth && $birth_of_place && $date_of_entry && $religion && $gender && $address && $whatsapp && $position && $division && $active) {

            if ($data = Contact::where('uuid', $id)->first()) {
                if ($stores = Store::where('uuid', $store)->first()) {
                    $idStore = $stores['id'];
                } else {
                    $idStore = null;
                }

                if ($account) {
                    if ($users = User::where('uuid', $account)->first()) {
                        $idUsers = $users['id'];
                    } else {
                        $idUsers = null;
                    }
                } else {
                    if ($data['users_id']) {
                        $idUsers = $data['users_id'];
                    } else {
                        $idUsers = null;
                    }
                }

                $validator = Validator::make(
                    $request->all(),
                    [
                        'img' => 'mimes:jpeg,jpg,png'
                    ]
                );

                if ($data['name'] == $name) {
                    $validateName = $name;
                } else {
                    if (Contact::where('name', $name)->count()) {
                        return response()->json(
                            [
                                'response' => 'warning',
                                'message' =>  'Name already used'
                            ],
                            200
                        );
                    } else {
                        $validateName = $name;
                    }
                }

                if ($validateName) {
                    if ($validator->fails()) {
                        foreach ($validator->errors()->all() as $message) {
                            return response()->json(
                                [
                                    'response' => 'warning',
                                    'message' =>  $message
                                ],
                                200
                            );
                        }
                    } else {
                        if ($idUsers) {
                            if (Contact::where('users_id', $idUsers)->count()) {
                                if ($data['users_id'] !== $idUsers) {
                                    return response()->json(
                                        [
                                            'response' => 'warning',
                                            'message' => 'Account login has been used',
                                        ],
                                        200
                                    );
                                }
                            }
                        }

                        if ($request->hasFile('img')) {
                            if (!is_dir(public_path('uploads/contact/'))) {
                                mkdir(public_path('uploads/contact/'), 0777, true);
                            }
                            if (file_exists(public_path($data['img'])) && $data['img']) {
                                unlink(public_path($data['img']));
                            }
                            $files = $request->file('img');
                            $imageName =  date('YmdHis') . '.' . $files->getClientOriginalExtension();
                            $urlimg =  '/uploads/contact/' . $imageName;
                            imageUpload($files, $urlimg);
                        } else if ($imgDel) {
                            if (file_exists(public_path($data['img'])) && $data['img']) {
                                unlink(public_path($data['img']));
                            }
                            $urlimg = null;
                        } else {
                            $urlimg = $data['img'];
                        }

                        if (Contact::where('uuid', $id)->update([
                            'name' =>  ucwords(strtolower($name)),
                            'date_of_birth' => $date_of_birth,
                            'birth_of_place' => $birth_of_place,
                            'date_of_entry' => $date_of_entry,
                            'religion' => $religion,
                            'gender' => $gender,
                            'address' => $address,
                            'whatsapp' => $whatsapp,
                            'position' => $position,
                            'division' => $division,
                            'active' => $active,
                            'store_id' => $idStore,
                            'img' => $urlimg,
                            'free_voucher' => $free_voucher ?? 0,
                            'users_id' => $idUsers
                        ])) {
                            return response()->json(
                                [
                                    'response' => 'success',
                                    'message' => 'Change was successful',
                                ],
                                200
                            );
                        } else {
                            return response()->json(
                                [
                                    'response' => 'error',
                                    'message' =>  'Database trauble'
                                ],
                                200
                            );
                        };
                    }
                }
            } else {
                return response()->json(
                    [
                        'response' => 'warning',
                        'message' => 'Contact not found'
                    ],
                    200
                );
            }
        } else {
            return response()->json(
                [
                    'response' => 'error',
                    'message' => 'Bad Request'
                ],
                200
            );
        }
    }

    public function create(Request $request)
    {
        $name = $request->input('name');
        $date_of_birth = $request->input('date_of_birth');
        $birth_of_place = $request->input('birth_of_place');
        $date_of_entry = $request->input('date_of_entry');
        $religion = $request->input('religion');
        $gender = $request->input('gender');
        $address = $request->input('address');
        $whatsapp = $request->input('whatsapp');
        $position = $request->input('position');
        $division = $request->input('division');
        $store = $request->input('store');
        $active = $request->input('active');
        $free_voucher = $request->input('free_voucher');

        $users_id = $request->input('users_id');
        $id = $request->input('id');

        if ($name && $date_of_birth && $birth_of_place && $date_of_entry && $religion && $gender && $address && $whatsapp && $position && $division && $store) {

            $validator = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'date_of_birth' => 'required',
                    'birth_of_place' => 'required',
                    'date_of_entry' => 'required',
                    'religion' => 'required',
                    'gender' => 'required',
                    'address' => 'required',
                    'whatsapp' => 'required',
                    'position' => 'required',
                    'division' => 'required',
                    'store' => 'required',
                    'img' => 'image'
                ]
            );

            if ($validator->fails()) {
                foreach ($validator->errors()->all() as $message) {

                    return response()->json(
                        [
                            'response' => 'warning',
                            'message' =>  $message
                        ],
                        200
                    );
                }
            } else {
                $dataContact = Contact::where('name', ucwords(strtolower($name)))->where('delete', false)->first();
                $dataStore = Store::where('uuid', $store)->where('delete', false)->first();
                $dataUsers = User::where('uuid', $users_id)->first();
                if (!$dataContact && $dataStore) {
                    if ($request->hasFile('img')) {
                        if (!is_dir(public_path('uploads/contact/'))) {
                            mkdir(public_path('uploads/contact/'), 0777, true);
                        }
                        $files = $request->file('img');
                        $imageName = date('YmdHis') . '.' . $files->getClientOriginalExtension();
                        $urlimg = '/uploads/contact/' . $imageName;
                        imageUpload($files, $urlimg);
                    } else {
                        $urlimg = '';
                    }

                    if (Contact::create([
                        'uuid' => Str::uuid(),
                        'name' =>  ucwords(strtolower($name)),
                        'code' => date('ymd', strtotime($date_of_birth)) . Contact::count() + 1,
                        'date_of_birth' => $date_of_birth,
                        'birth_of_place' => $birth_of_place,
                        'date_of_entry' => $date_of_entry,
                        'religion' => $religion,
                        'gender' => $gender,
                        'address' => $address,
                        'whatsapp' => $whatsapp,
                        'position' => $position,
                        'division' => $division,
                        'active' => $active,
                        'store_id' => $dataStore['id'],
                        'users_id' => $dataUsers ? $dataUsers['id'] : null,
                        'img' => $urlimg,
                        'free_voucher' => $free_voucher ?? 0
                    ])) {
                        return response()->json(
                            [
                                'response' => 'success',
                                'message' => 'Create successful',
                            ],
                            200
                        );
                    } else {
                        return response()->json(
                            [
                                'response' => 'error',
                                'message' =>  'Database trauble'
                            ],
                            500
                        );
                    };
                } else {
                    if (!$dataContact['users_id']) {
                        return response()->json(
                            [
                                'response' => 'warning',
                                'message' =>  'Name already used',
                                'data' => $dataContact
                            ],
                            200
                        );
                    } else {
                        return response()->json(
                            [
                                'response' => 'warning',
                                'message' =>  'Name already used'
                            ],
                            200
                        );
                    }
                }
            }
        } else if ($users_id && $id) {
            $dataUsers = User::where('uuid', $users_id)->first();
            if ($dataUsers) {
                if (Contact::where('uuid', $id)->update(['users_id' => $dataUsers['id']])) {
                    $ContactData = Contact::where('uuid', $id)->with('Store', 'Users')->first();
                    return response()->json(
                        [
                            'response' => 'success',
                            'message' => 'Contact successful',
                            'data' => $ContactData
                        ],
                        200
                    );
                } else {
                    return response()->json(
                        [
                            'response' => 'error',
                            'message' =>  'Database trauble'
                        ],
                        200
                    );
                }
            } else {
                return response()->json(
                    [
                        'response' => 'error',
                        'message' => 'Bad Request'
                    ],
                    200
                );
            }
        } else {
            return response()->json(
                [
                    'response' => 'error',
                    'message' => 'Store not found'
                ],
                200
            );
        }
    }
}
