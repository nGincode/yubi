import React, { useState, useRef, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

import Skeleton from "@/Components/Skeleton";
import DataTables from "@/Components/DataTables";
import Button from "@/Components/Button";
import Toastr from "@/Components/Toastr";
import Validate from "@/Components/Validate";
import PermissionData from "@/Components/PermissionData";

export default function AccountsUsers(props) {
    const urlPage = "accounts_users";
    const namePage = "Users";
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
                    url: "/api/users/create",
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
                setTimeout(() => {
                    setprocessing(false);
                }, 5000);
                Toastr("error", error.message);
            }
        }
    };

    //required
    const setValidate = {
        username: {
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        email: {
            required: true,
            email: true,
        },
        password: {
            required: true,
            minlength: 8,
        },
        password_confirmation: {
            required: true,
            minlength: 8,
            equalTo: "#password",
        },
    };

    const setValidateUpdate = {
        usernameUpdate: {
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        emailUpdate: {
            required: true,
            email: true,
        },
        passwordUpdate: {
            required: true,
            minlength: 8,
        },
        passwordUpdateNew: {
            required: true,
            minlength: 8,
        },
        passwordUpdateNew_confirmation: {
            required: true,
            minlength: 8,
            equalTo: "#passwordUpdateNew",
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

    //useEffect
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
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="username"
                                                    >
                                                        Username
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        id="username"
                                                        onChange={(val) => {
                                                            $("#username").val(
                                                                val.target.value
                                                                    .replace(
                                                                        /[^\w\s]/gi,
                                                                        ""
                                                                    )
                                                                    .replace(
                                                                        " ",
                                                                        ""
                                                                    )
                                                                    .toLowerCase()
                                                            );
                                                        }}
                                                        className="form-control"
                                                        placeholder="Username"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="email"
                                                    >
                                                        Email
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        id="email"
                                                        onChange={(val) => {
                                                            $("#email").val(
                                                                val.target.value
                                                                    .replace(
                                                                        /\s/g,
                                                                        ""
                                                                    )
                                                                    .toLowerCase()
                                                            );
                                                        }}
                                                        className="form-control"
                                                        placeholder="abc123@gmail.com"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="password"
                                                    >
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        className="form-control"
                                                        placeholder="*********"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="password_confirmation"
                                                    >
                                                        Confirm Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="password_confirmation"
                                                        id="password_confirmation"
                                                        className="form-control"
                                                        placeholder="**********"
                                                    />
                                                </div>
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
                                                data: "username",
                                                title: "Username",
                                            },
                                            {
                                                data: "email",
                                                title: "Email",
                                            },
                                            {
                                                data: "last_login_at",
                                                title: "Last Login",
                                            },
                                            {
                                                data: "last_login_ip",
                                                title: "Last Login IP",
                                            },
                                            {
                                                data: "action",
                                                title: "Action",
                                                orderable: false,
                                                width: 50,
                                                className: "text-right",
                                            },
                                        ]}
                                        API="/api/users"
                                        Method="POST"
                                        Subject="Users"
                                        setValidate={setValidateUpdate}
                                        Action={permission["managePerm"]}
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
