<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Store;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class AccountsStoreApi extends Controller
{

    public function all(Request $request)
    {
        $action = $request->input('Action');
        $active = $request->input('Active');


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


        if ($active) {
            $database = Store::where('active', "True")->where('delete', false)->orderBy('name', 'ASC')->get();
        } else {
            $database = Store::where('delete', false)->orderBy('name', 'ASC')->get();
        }



        foreach ($database as $key => $value) {

            if ($action) {
                $data[] = [
                    'id' => $value['uuid'],
                    'img' => $value['img'] ? "<img src='" . $value['img'] . "'  class='imgManage'>" : "<img src='assets/unamaed/unnamed.png'  class='imgManage' >",
                    'name' => $value['name'],
                    'whatsapp' => $value['whatsapp'],
                    'status' => ($value['active'] === "True" ? '<div class="badge badge-success">Active</div>' : '<div class="badge badge-danger">Non Active</div>') . ' ' . ($value['tipe'] ? '<div class="badge badge-primary">' . $value['tipe'] . '</div>' : ''),
                    'active' => $value['active'],
                    'action' => $act ?? ''
                ];
            } else {
                $data[] = [
                    'id' => $value['uuid'],
                    'name' => $value['name'],
                    'img' => $value['img'] ? "<img src='" . $value['img'] . "'  class='imgManage'>" : "<img src='assets/unamaed/unnamed.png'  class='imgManage'>",
                    'whatsapp' => $value['whatsapp'],
                    'status' => $value['active'] === "True" ? '<div class="badge badge-success">Active</div>' : '<div class="badge badge-danger">Non Active</div>',
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

        if ($id) {
            $data = Store::where('uuid', $id)->first();

            $late_tolerance = null;
            $firstpriod = null;
            $endpriod = null;
            $statuspriod = null;
            if ($data['setting']) {
                $setting = json_decode($data['setting'], true);
                if (isset($setting['late_tolerance'])) {
                    $late_tolerance = $setting['late_tolerance'];
                }

                if (isset($setting['working_period'][2])) {
                    $firstpriod = $setting['working_period'][0];
                    $statuspriod = $setting['working_period'][1];
                    $endpriod = $setting['working_period'][2];
                }
            }

            return response()->json(
                [
                    'response' => 'success',
                    'message' => $data ? 'ok' : 'Nothing',
                    'data' => $data ? [
                        'id' => $data['uuid'],
                        'active' => $data['active'],
                        'address' => $data['address'],
                        'img' => $data['img'],
                        'name' => $data['name'],
                        'tipe' => $data['tipe'],
                        'whatsapp' => $data['whatsapp'],
                        'late_tolerance' => $late_tolerance,
                        'firstpriod' => $firstpriod,
                        'statuspriod' => $statuspriod,
                        'endpriod' => $endpriod
                    ] : []
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

        if ($id) {
            if (Store::where('uuid', $id)->update(['delete' => true])) {

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
        $tipe = $request->input('tipeUpdate');
        $address = $request->input('addressUpdate');
        $whatsapp = $request->input('whatsappUpdate');
        $late = $request->input('lateUpdate');
        $active = $request->input('statusUpdate');

        $firstpriod = $request->input('firstpriodUpdate');
        $statuspriod = $request->input('statuspriodUpdate');
        $endpriod = $request->input('endpriodUpdate');

        $id = $request->input('id');
        $imgDel = $request->input('imgDel');


        if ($name && $tipe && $address && $whatsapp && $late && $endpriod && $statuspriod && $firstpriod) {

            if ($statuspriod === 'Active' && $firstpriod >  $endpriod) {
                return response()->json(
                    [
                        'response' => 'warning',
                        'message' =>  'Not Valid Working Period Date'
                    ],
                    200
                );
            }


            if ($data = Store::where('uuid', $id)->first()) {

                $validator = Validator::make(
                    $request->all(),
                    [
                        'img' => 'mimes:jpeg,jpg,png'
                    ]
                );

                if ($data['name'] == $name) {
                    $usernameValidate = $name;
                } else {
                    $str = Store::where('name', $name)->count();
                    if ($str) {
                        return response()->json(
                            [
                                'response' => 'warning',
                                'message' =>  'Name already used'
                            ],
                            200
                        );
                    } else {
                        $usernameValidate = $name;
                    }
                }

                if ($usernameValidate) {
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

                        if ($request->hasFile('img')) {
                            if (!is_dir(public_path('uploads/stores/'))) {
                                mkdir(public_path('uploads/stores/'), 0777, true);
                            }
                            if (file_exists(public_path($data['img'])) && $data['img']) {
                                unlink(public_path($data['img']));
                            }
                            $files = $request->file('img');
                            $imageName =  date('YmdHis') . '.' . $files->getClientOriginalExtension();
                            $urlimg =  '/uploads/stores/' . $imageName;
                            imageUpload($files, $urlimg);
                        } else if ($imgDel) {
                            if (file_exists(public_path($data['img'])) && $data['img']) {
                                unlink(public_path($data['img']));
                            }
                            $urlimg = null;
                        } else {
                            $urlimg = $data['img'];
                        }

                        if (store::where('uuid', $id)->update([
                            'name' => $name,
                            'active' => $active,
                            'tipe' => $tipe,
                            'address' => $address,
                            'whatsapp' => $whatsapp,
                            'img' => $urlimg,
                            'setting' => json_encode(['late_tolerance' => $late, 'working_period' => [$firstpriod, $statuspriod, $endpriod]])
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
        $tipe = $request->input('tipe');
        $address = $request->input('address');
        $whatsapp = $request->input('whatsapp');
        $status = $request->input('status');
        $late = $request->input('late');
        $firstpriod = $request->input('firstpriod');
        $statuspriod = $request->input('statuspriod');
        $endpriod = $request->input('endpriod');

        if ($name && $tipe && $address && $whatsapp && $late && $endpriod && $statuspriod && $firstpriod) {
            $validator = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'status' => 'required',
                    'tipe' => 'required',
                    'address' => 'required',
                    'whatsapp' => 'required',
                    'firstpriod' => 'required',
                    'late' => 'required',
                    'statuspriod' => 'required',
                    'endpriod' => 'required',
                    'img' => 'mimes:jpeg,jpg,png'
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
                if ($statuspriod === 'Active' && $firstpriod >  $endpriod) {
                    return response()->json(
                        [
                            'response' => 'warning',
                            'message' =>  'Not Valid Working Period Date'
                        ],
                        200
                    );
                }

                if (!Store::where('name', $request->input('name'))->where('delete', false)->count()) {
                    if ($request->hasFile('img')) {
                        if (!is_dir(public_path('uploads/stores/'))) {
                            mkdir(public_path('uploads/stores/'), 0777, true);
                        }
                        $files = $request->file('img');
                        $imageName = date('YmdHis') . '.' . $files->getClientOriginalExtension();
                        $urlimg =  '/uploads/stores/' . $imageName;
                        imageUpload($files, $urlimg);
                    } else {
                        $urlimg = '';
                    }

                    if (store::create([
                        'uuid' => Str::uuid(),
                        'name' => ucwords($name),
                        'active' => $status,
                        'tipe' => $tipe,
                        'address' => $address,
                        'whatsapp' => $whatsapp,
                        'img' => $urlimg,
                        'setting' => json_encode(['late_tolerance' => $late, 'working_period' => [$firstpriod, $statuspriod, $endpriod]])
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
