import React, { useState, useRef, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { Helmet } from "react-helmet";

import Skeleton from "@/Components/Skeleton";
import DataTables from "@/Components/DataTables";
import SelectTo from "@/Components/SelectTo";
import Toastr from "@/Components/Toastr";
import Button from "@/Components/Button";
import Validate from "@/Components/Validate";
import PermissionData from "@/Components/PermissionData";
import ImgUpload from "@/Components/ImgUpload";

export default function AccountsStore(props) {
    const urlPage = "accounts_store";
    const namePage = "Store";
    const permission = PermissionData(
        "Auth",
        props.permission,
        props.groups.groups.data,
        urlPage
    );

    //state
    const [processing, setprocessing] = useState(false);

    //post
    const handleAsync = async (tipe) => {
        if (tipe === "create") {
            var data = new FormData($("#createForm")[0]);
            try {
                await axios({
                    method: "POST",
                    url: "/api/store/create",
                    data: data,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json",
                        Authorization: `Bearer ${props.auth.user.token_api}`,
                        "X-CSRF-TOKEN": props.csrf_token,
                    },
                }).then((res) => {
                    setTimeout(() => {
                        setprocessing(false);
                    }, 5000);
                    Toastr(res.data.response, res.data.message);
                    if (res.data.response === "success") {
                        $("#DataTables").DataTable().ajax.reload();
                        $("#createForm")[0].reset();
                        $(".is-valid").removeClass("is-valid");
                    }
                });
            } catch (error) {
                Toastr("error", error.message);
                setTimeout(() => {
                    setprocessing(false);
                }, 5000);
            }
        }
    };

    //required
    const dataActive = [
        { value: "True", label: "Active" },
        { value: "False", label: "Non Active" },
    ];

    const dataTipe = [
        { value: "Office", label: "Office" },
        { value: "Outlet", label: "Outlet" },
        { value: "Dapur Produksi", label: "Dapur Produksi" },
        { value: "Logistik", label: "Logistik" },
        { value: "Khusus", label: "Khusus" },
    ];

    const setValidate = {
        name: {
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        address: {
            required: true,
            minlength: 3,
            maxlength: 191,
        },
        status: {
            required: true,
        },
        tipe: {
            required: true,
        },
        whatsapp: {
            required: true,
            minlength: 10,
            maxlength: 15,
        },
        late: {
            required: true,
            min: 1,
            max: 30,
        },
        firstpriod: {
            required: true,
            min: 1,
            max: 31,
        },
        endpriod: {
            required: true,
            min: 1,
            max: 31,
        },
    };

    const setValidateUpdate = {
        nameUpdate: {
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        addressUpdate: {
            required: true,
            minlength: 3,
            maxlength: 191,
        },
        statusUpdate: {
            required: true,
        },
        tipeUpdate: {
            required: true,
        },
        whatsappUpdate: {
            required: true,
            minlength: 10,
            maxlength: 15,
        },
        lateUpdate: {
            required: true,
            min: 1,
            max: 30,
        },
        firstpriodUpdate: {
            required: true,
            min: 1,
            max: 31,
        },
        endpriodUpdate: {
            required: true,
            min: 1,
            max: 31,
        },
    };

    //submit
    const submit = (e) => {
        setprocessing(true);
        e.preventDefault();
        if (Validate("#createForm", setValidate)) {
            handleAsync("create");
        } else {
            setprocessing(false);
        }
    };

    //useEFfect
    useEffect(() => {
        $("#main-wrapper").removeClass("menu-toggle");
        $(".hamburger ").removeClass("is-active");
    }, []);

    return (
        <>
            <Head title={namePage} />
            <div className="row page-titles">
                <div className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a>Accounts</a>
                    </li>
                    <li className="breadcrumb-item  active">
                        <Link href={route(urlPage)}>{namePage}</Link>
                    </li>
                </div>
            </div>
            <Skeleton />

            <div id="content">
                {permission["create"] && (
                    <div className="col-xl-12 ">
                        <div className="card">
                            <div className="card-header coin-card">
                                <h4 className="card-title text-white">
                                    <b>{namePage}</b>
                                </h4>
                            </div>
                            <div className="card-body">
                                <div className="basic-form">
                                    <form id="createForm" onSubmit={submit}>
                                        <ImgUpload name="img" id="img" />
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="name"
                                                    >
                                                        Name Store
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        className="form-control"
                                                        placeholder="Name Store"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        id="address"
                                                        className="form-control"
                                                        placeholder="Jl. Jend xxx"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Status
                                                    </label>
                                                    <SelectTo
                                                        name="status"
                                                        id="status"
                                                        data={dataActive}
                                                        defaultValue=""
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Tipe
                                                    </label>
                                                    <SelectTo
                                                        name="tipe"
                                                        id="tipe"
                                                        defaultValue=""
                                                        data={dataTipe}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Whatsapp
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="whatsapp"
                                                        id="whatsapp"
                                                        className="form-control"
                                                        placeholder="0822XXX"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Late Tolerance (minute)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="late"
                                                        id="late"
                                                        className="form-control"
                                                        placeholder="1 minute"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Working Period Date
                                                    </label>
                                                    <div className="flex items-start">
                                                        <div className="input-group mb-1">
                                                            <input
                                                                type="number"
                                                                name="firstpriod"
                                                                id="firstpriod"
                                                                className="form-control"
                                                                placeholder="Start"
                                                            />
                                                            <SelectTo
                                                                name="statuspriod"
                                                                id="statuspriod"
                                                                data={[
                                                                    {
                                                                        label: "Active  Month",
                                                                        value: "Active",
                                                                    },
                                                                    {
                                                                        label: "Next Month",
                                                                        value: "Next",
                                                                    },
                                                                ]}
                                                                defaultValue=""
                                                            />
                                                            <input
                                                                type="number"
                                                                name="endpriod"
                                                                id="endpriod"
                                                                className="form-control"
                                                                placeholder="End"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <font color="red">*</font> If
                                                select now the first date does
                                                not exceed the end date
                                            </div>
                                        </div>
                                        <hr />
                                        <Button
                                            type="submit"
                                            className="btn btn-primary"
                                            processing={processing}
                                        >
                                            Submit
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {permission["view"] && (
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header bg-secondary">
                                <h4 className="card-title  text-white">
                                    <b>Data {namePage}</b>
                                </h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <DataTables
                                        columns={[
                                            {
                                                data: "img",
                                                title: "#",
                                            },
                                            {
                                                data: "name",
                                                title: "Nama",
                                            },
                                            {
                                                data: "whatsapp",
                                                title: "Whatsapp",
                                            },
                                            {
                                                data: "status",
                                                title: "Status",
                                            },
                                            {
                                                data: "action",
                                                title: "Action",
                                                orderable: false,
                                                width: 50,
                                                className: "text-right",
                                            },
                                        ]}
                                        API="/api/store"
                                        Method="POST"
                                        Subject="Store"
                                        Action={permission["managePerm"]}
                                        setValidate={setValidateUpdate}
                                        csrf_token={props.csrf_token}
                                        api_token={`Bearer ${props.auth.user.token_api}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
