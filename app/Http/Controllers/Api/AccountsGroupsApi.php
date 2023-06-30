<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Groups;
use App\Models\GroupsUsers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class AccountsGroupsApi extends Controller
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


        $database = GroupsUsers::with(['Users', 'Groups'])->latest()->get();

        $id = array();
        $usr = array();
        $nama = array();
        $data_display = array();
        $permission = array();
        foreach ($database as $v) {
            if (isset($v->groups->id)) {
                $usr[] = array(
                    str_replace(" ", "_", $v->groups->name)  => $v->users->username
                );
                $nama[] = $v->groups->name;
                $permission[] = $v->groups->permission;
                $data_display[] = $v->groups->data;
                $id[] = $v->groups->uuid;
            } else {
                $usr[] = array();
                $nama[] = 'Tak Ditemukan (Hapus)';
                $id[] = $v['uuid'];
                $data_display[] = '';
                $permission[] = '';
            }
        }
        $nama = array_unique($nama);




        foreach ($nama as $key => $name) {

            $username = '<div style="max-width: 300px;font-size: smaller;">';
            foreach ($usr as $v2) {
                if (isset($v2[str_replace(" ", "_", $name)])) {
                    $username .= $v2[str_replace(" ", "_", $name)] . ' | ';
                }
            }
            $username .= '</div>';
            $izin = '';
            if ($permission[$key]) {
                $judul = array_unique(str_replace(['create', 'update', 'view', 'delete'], '', unserialize($permission[$key])));
                $user_permission = unserialize($permission[$key]);
                foreach ($judul as $v) {
                    $izin .= ' <div class="flex mb-1" style="font-size: smaller"><div style="min-width: 130px;">' . ucwords(str_replace('_', ' ', $v)) . '</div>
                    <span class="text-right w-full mr-2" style="min-width: 130px;"> ';
                    if (in_array('view' . $v, $user_permission)) {
                        $izin .= '<span class="badge badge-primary" ><i class="fa fa-eye"></i></span> ';
                    }
                    if (in_array('create' . $v, $user_permission)) {
                        $izin .= '<span class="badge badge-success" ><i class="fa fa-plus"></i></span> ';
                    }
                    if (in_array('update' . $v, $user_permission)) {
                        $izin .= '<span class="badge badge-warning" ><i class="fa fa-pencil"></i></span> ';
                    }
                    if (in_array('delete' . $v, $user_permission)) {
                        $izin .= '<span class="badge badge-danger" ><i class="fa fa-trash"></i></span> ';
                    }
                    $izin .= ' </span></div>';
                }
            }

            if ($action) {
                $data[] = [
                    'id' => $id[$key],
                    'name' => $name,
                    'permission' => $izin,
                    'users' => $username,
                    'data' => $data_display[$key],
                    'action' => $act ?? ''
                ];
            } else {
                $data[] = [
                    'id' => $id[$key],
                    'name' => $name,
                    'permission' => $izin,
                    'data' => $data_display[$key],
                    'users' => $username,
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

        if ($id) {
            $data = [];
            if ($dt = Groups::with('GroupsUsers')->where('uuid', $id)->first()) {

                $dtUsr = [];
                foreach ($dt['GroupsUsers'] as $key => $value) {
                    if ($user = User::where('id', $value['users_id'])->first()) {
                        $dtUsr[] = ['value' => $user['uuid'], 'label' => $user['username']];
                    }
                }
                $data['id'] = $dt['uuid'];
                $data['name'] = $dt['name'];
                $data['permission'] =  unserialize($dt['permission']);
                $data['users'] =  $dtUsr;
                $data['data'] =  $dt['data'];
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
                200
            );
        }
    }

    public function delete(Request $request)
    {
        $id = $request->input('id');

        $data = Groups::where('uuid', $id)->first();
        if ($id && $data) {
            if (Groups::where('id', $data['id'])->delete()) {
                GroupsUsers::where('groups_id', $data['id'])->delete();
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
                200
            );
        }
    }

    public function update(Request $request)
    {
        $name = $request->input('nameUpdate');
        $permission = $request->input('permissionUpdate');
        $target = $request->input('targetUpdate');
        $data_display = $request->input('data_displayUpdate');

        $id = $request->input('id');

        if ($id && $name  && $permission && $target) {

            if ($data = Groups::where('uuid', $id)->first()) {

                $validator = Validator::make(
                    $request->all(),
                    [
                        'nameUpdate' => 'required',
                    ]
                );

                if ($data['name'] == $name) {
                    $nameValid = $name;
                } else {
                    $dt = Groups::where('name', $name)->count();
                    if ($dt) {
                        return response()->json(
                            [
                                'response' => 'warning',
                                'message' =>  'Name already used'
                            ],
                            200
                        );
                        $nameValid = '';
                    } else {
                        $nameValid = $name;
                    }
                }

                if ($nameValid) {
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

                        if (Groups::where('id', $data['id'])->update([
                            'name' => $name,
                            'permission' => serialize($permission),
                            'data' => $data_display
                        ])) {
                            if ($id) {
                                GroupsUsers::where('groups_id', $data['id'])->delete();
                                foreach ($target as $v) {
                                    if ($user = User::where('uuid', $v)->first()) {
                                        GroupsUsers::create([
                                            'uuid' => Str::uuid(),
                                            'groups_id' => $data['id'],
                                            'users_id' => $user['id'],
                                        ]);
                                    }
                                }
                            }

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
                    'message' => 'Bad Request'
                ],
                200
            );
        }
    }

    public function create(Request $request)
    {
        $name = $request->input('name');
        $permission = $request->input('permission');
        $target = $request->input('target');
        $data_display = $request->input('data_display');

        if ($name && $permission && $target && $data_display) {
            $validator = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'permission' => 'required',
                    'target' => 'required',
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

                $targetValid = '';
                foreach ($target as $v) {
                    if ($GrpUsr = GroupsUsers::where('users_id', $v)->with('Users')->first()) {
                        $targetValid .= $GrpUsr['Users']->username . ' ';
                    }
                }

                if (!$targetValid) {
                    if (!Groups::where('name', $name)->count()) {

                        if ($create = Groups::create([
                            'uuid' => Str::uuid(),
                            'name' => $name,
                            'permission' => serialize($permission),
                            'data' => $data_display
                        ])) {

                            if ($create) {
                                foreach ($target as $v) {
                                    if ($user = User::where('uuid', $v)->first()) {
                                        GroupsUsers::create([
                                            'uuid' => Str::uuid(),
                                            'groups_id' => $create->id,
                                            'users_id' => $user['id'],
                                        ]);
                                    }
                                }
                            }

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
                                'message' =>  'Name already used'
                            ],
                            200
                        );
                    }
                } else {
                    return response()->json(
                        [
                            'response' => 'warning',
                            'message' =>  'Target ' . $targetValid . ' Used'
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
