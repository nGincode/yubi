<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GroupsUsers;
use App\Models\User;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class AccountsUsersApi extends Controller
{

    public function all(Request $request)
    {
        $action = $request->input('Action');
        $nolinked = $request->input('nolinked');
        $linked = $request->input('linked');


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
                data-bs-target=".bd-modal-lg" style="color:orange"><i class="fa fa-pencil"></i>  Update</a>';
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

        $database = User::with('contact', 'groupsusers')->orderBy('username', 'ASC')->get();


        foreach ($database as $key => $value) {
            if ($action) {
                if ($nolinked && !count($value['contact'])) {
                    if ($value['email_verified_at']) {
                        $data[] = [
                            'id' => $value['uuid'],
                            'username' => $value['username'],
                            'last_login_at' => $value['last_login_at'] ? date('d-M-Y H:i:s', strtotime($value['last_login_at'])) : '-',
                            'last_login_ip' => $value['last_login_ip'],
                            'email' => '<a href="mailto:' . $value['email'] . '" >' . $value['email'] . '</a>',
                            'action' => $act ?? ''
                        ];
                    }
                } else if ($linked && count($value['contact'])) {
                    if ($value['email_verified_at']) {
                        $data[] = [
                            'id' => $value['uuid'],
                            'username' => $value['username'] . '<br>' . $value['contact'][0]['name'],
                            'last_login_at' => $value['last_login_at'] ? date('d-M-Y H:i:s', strtotime($value['last_login_at'])) : '-',
                            'last_login_ip' => $value['last_login_ip'],
                            'email' => '<a href="mailto:' . $value['email'] . '" >' . $value['email'] . '</a>',
                            'action' => $act ?? ''
                        ];
                    }
                } else {
                    $data[] = [
                        'id' => $value['uuid'],
                        'username' => $value['username']  . '<br /><small style="color:green">' . (isset($value['contact'][0]->name) ? '<i class="fa fa-address-book"></i> ' . $value['contact'][0]->name : '') . '</small>',
                        'last_login_at' => $value['last_login_at'] ? date('d-M-Y H:i:s', strtotime($value['last_login_at'])) : '-',
                        'last_login_ip' => $value['last_login_ip'],
                        'email' => '<a href="mailto:' . $value['email'] . '" ' . ($value['email_verified_at']  ? ' style="color:green"' : '') . '>' . $value['email'] . '</a>',
                        'action' => $act ?? ''
                    ];
                }
            } else {
                if ($nolinked) {
                    if (!count($value['contact'])) {
                        if ($value['email_verified_at']) {
                            //Penampilan data user belum di linkan (berada di contact)
                            $data[] = [
                                'id' => $value['uuid'],
                                'username' => $value['username'],
                                'last_login_at' => $value['last_login_at'] ? date('d-M-Y H:i:s', strtotime($value['last_login_at'])) : '-',
                                'last_login_ip' => $value['last_login_ip'],
                                'email' => '<a href="mailto:' . $value['email'] . '" >' . $value['email'] . '</a>',
                            ];
                        }
                    }
                } else if ($linked) {
                    if (count($value['contact'])) {
                        if ($value['email_verified_at']) {
                            $data[] = [
                                'id' => $value['uuid'],
                                'username' => $value['username'],
                                'last_login_at' => $value['last_login_at'] ? date('d-M-Y H:i:s', strtotime($value['last_login_at'])) : '-',
                                'last_login_ip' => $value['last_login_ip'],
                                'email' => '<a href="mailto:' . $value['email'] . '" >' . $value['email'] . '</a>',
                            ];
                        }
                    }
                } else {
                    $data[] = [
                        'id' => $value['uuid'],
                        'username' => $value['username'],
                        'last_login_at' => $value['last_login_at'] ? date('d-M-Y H:i:s', strtotime($value['last_login_at'])) : '-',
                        'last_login_ip' => $value['last_login_ip'],
                        'email' => '<a href="mailto:' . $value['email'] . '" >' . $value['email'] . '</a>',
                    ];
                }
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
        $uniquegroups = $request->input('uniquegroups');

        if ($id) {
            $data = User::where('uuid', $id)->first();
            return response()->json(
                [
                    'response' => 'success',
                    'message' => $data ? 'ok' : 'Nothing',
                    'data' => $data ? [
                        'id' => $data['uuid'],
                        'username' => $data['username'],
                        'last_login_at' => $data['last_login_at'],
                        'last_login_ip' => $data['last_login_ip'],
                        'email' =>  $data['email'],
                    ] : []
                ],
                200
            );
        } else if ($uniquegroups) {
            $data = [];
            foreach (User::with('GroupsUsers')->get() as $v) {
                if (!isset($v->GroupsUsers[0])) {
                    $data[] = ['value' => $v['uuid'], 'label' => $v['username']];
                }
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
                    'message' => 'Bad Request'
                ],
                400
            );
        }
    }

    public function delete(Request $request)
    {
        $id = $request->input('id');

        if ($id) {
            if (User::where('uuid', $id)->delete()) {

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
        $username = $request->input('usernameUpdate');
        $email = $request->input('emailUpdate');
        $password = $request->input('passwordUpdate');
        $confirm_password = $request->input('passwordUpdateNew_confirmation');
        $passwordNew = $request->input('passwordUpdateNew');
        $emailChanged = $request->input('emailChanged');

        $id = $request->input('id');

        if ($id && $username  && $email && $password && $confirm_password && $passwordNew) {
            $validator = Validator::make(
                $request->all(),
                [
                    'passwordUpdateNew' => ['required', 'confirmed', Rules\Password::defaults()]
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
                if ($dataUsers = User::where('uuid', $id)->first()) {
                    if (!User::where('username', $username)->count() || $dataUsers['username'] === $username) {
                        if (!User::where('email', $email)->count() || $dataUsers['email'] === $email) {
                            if (Hash::check($password, $dataUsers->password)) {

                                if (User::where('uuid', $id)->update([
                                    'username' => strtolower($username),
                                    'email' => $email,
                                    'password' => Hash::make($passwordNew)
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
                                        200
                                    );
                                };
                            } else {
                                return response()->json(
                                    [
                                        'response' => 'warning',
                                        'message' =>  'Password old not correct'
                                    ],
                                    200
                                );
                            }
                        } else {
                            return response()->json(
                                [
                                    'response' => 'warning',
                                    'message' =>  'Email already used'
                                ],
                                200
                            );
                        }
                    } else {
                        return response()->json(
                            [
                                'response' => 'warning',
                                'message' =>  'Name already used'
                            ],
                            200
                        );
                    }
                } else {
                    return response()->json(
                        [
                            'response' => 'warning',
                            'message' =>  'User ID Not Valid'
                        ],
                        200
                    );
                }
            }
        } else {
            $usersid = User::where('uuid', $id)->first();
            if (
                $emailChanged &&
                $usersid
            ) {
                if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $users = User::where('email', $email)->first();
                    if (!$users) {
                        if (User::where('uuid', $id)->update([
                            'email' => $email,
                        ])) {
                            return response()->json(
                                [
                                    'response' => 'success',
                                    'message' => 'Change successful',
                                    'email' => $email,
                                    'send' => true
                                ],
                                200
                            );
                        } else {
                            return response()->json(
                                [
                                    'response' => 'error',
                                    'message' =>  'Database trauble',
                                    'send' => false
                                ],
                                200
                            );
                        };
                    } else if ($email == $usersid['email']) {
                        return response()->json(
                            [
                                'response' => 'success',
                                'message' => 'Email anda tidak berubah',
                                'send' => true
                            ],
                            200
                        );
                    } else {
                        return response()->json(
                            [
                                'response' => 'warning',
                                'message' => 'Email used',
                                'send' => false
                            ],
                            200
                        );
                    }
                } else {
                    return response()->json(
                        [
                            'response' => 'warning',
                            'message' => 'Email not valid',
                            'send' => false
                        ],
                        200
                    );
                }
            } else {
                return response()->json(
                    [
                        'response' => 'error',
                        'message' => 'Bad Request',
                        'send' => false
                    ],
                    200
                );
            }
        }
    }

    public function create(Request $request)
    {
        $username = $request->input('username');
        $email = $request->input('email');
        $password = $request->input('password');
        $confirm_password = $request->input('password_confirmation');

        if ($username && $email && $password && $confirm_password) {
            $validator = Validator::make(
                $request->all(),
                [
                    'username' => 'required',
                    'email' => 'required',
                    'password' => ['required', 'confirmed', Rules\Password::defaults()]
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
                if (!User::where('username', $request->input('username'))->count()) {
                    if (!User::where('email', $request->input('email'))->count()) {

                        if (User::create([
                            'uuid' => Str::uuid(),
                            'username' => $request->input('username'),
                            'email' => $request->input('email'),
                            'password' => Hash::make($request->password),
                            'email_verified_at' => date('Y-m-d H:i:s')
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
                                200
                            );
                        };
                    } else {
                        return response()->json(
                            [
                                'response' => 'warning',
                                'message' =>  'Email already used'
                            ],
                            200
                        );
                    }
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
}
