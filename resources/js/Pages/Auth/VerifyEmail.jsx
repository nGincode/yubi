import React, { useState, useRef, useEffect } from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

import Toastr from "@/Components/Toastr";

export default function VerifyEmail({ status, user, csrf_token }) {
    const { post, processing } = useForm();
    const [value, setvalue] = useState();
    const [processingg, setprocessingg] = useState(false);
    const [email, setemail] = useState(user.email);

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    const submitEmail = (e) => {
        e.preventDefault();

        handleAsync("update");
    };

    const handleAsync = async (tipe) => {
        if (tipe === "update") {
            var data = new FormData($("#createForm")[0]);
            data.append("id", user?.uuid);
            data.append("emailChanged", true);
            data.append("emailUpdate", value);
            try {
                await axios({
                    method: "POST",
                    url: "/api/users/update",
                    data: data,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json",
                        Authorization: `Bearer ${user.token_api}`,
                        "X-CSRF-TOKEN": csrf_token,
                    },
                }).then((res) => {
                    Toastr(res.data.response, res.data.message);
                    if (res.data.send) {
                        if (res.data.email) setemail(res.data.email);
                        setprocessingg(true);
                        post(route("verification.send"));
                    }
                    setTimeout(() => {
                        setprocessingg(false);
                    }, 5000);
                });
            } catch (error) {
                Toastr("error", error.message);
                setTimeout(() => {
                    setprocessingg(false);
                }, 5000);
            }
        }
    };

    const onChangeVal = (val) => {
        setvalue(val.target.value);
    };

    return (
        <Guest>
            <Head title="Email Verification" />

            <div className="authincation h-100">
                <div className="container h-100 mt-4">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-md-6">
                            <div className="authincation-content">
                                <div className="row no-gutters">
                                    <div className="col-xl-12">
                                        <div className="auth-form">
                                            <div className="text-center mb-3">
                                                <Link href="/">
                                                    <center>
                                                        <img
                                                            src="/assets/logo/yubi.png"
                                                            alt=""
                                                            width="150px"
                                                            className="img-fluid"
                                                        />
                                                    </center>
                                                </Link>
                                            </div>
                                            <h4 className="text-center mb-4">
                                                Verification Email
                                            </h4>
                                            <p>
                                                Thanks for signing up! Before
                                                getting started, could you
                                                verify your email address{" "}
                                                <font color="#5bcfc5">
                                                    <b>{email}</b>
                                                </font>{" "}
                                                by clicking on the link we just
                                                emailed to you? If you didn't
                                                receive the email, we will
                                                gladly send you another.
                                                <br />
                                            </p>
                                            {status ===
                                                "verification-link-sent" && (
                                                <div className="text-success">
                                                    A new verification link has
                                                    been sent to the email
                                                    address you provided during
                                                    registration.
                                                    <br />
                                                </div>
                                            )}
                                            <div className="mb-3 col-md-12">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Change Your Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="abc123@gmail.com"
                                                        style={{
                                                            border: "1px #00000061 solid",
                                                        }}
                                                        onChange={(val) => {
                                                            onChangeVal(val);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            {value ? (
                                                <form onSubmit={submitEmail}>
                                                    <div className="text-center">
                                                        <Button
                                                            className="btn btn-primary btn-block"
                                                            processing={
                                                                processingg
                                                            }
                                                        >
                                                            Change Email &
                                                            Resend
                                                        </Button>
                                                        <br />
                                                        <Link
                                                            href={route(
                                                                "logout"
                                                            )}
                                                            method="GET"
                                                            as="button"
                                                            className="btn btn-danger btn-block "
                                                        >
                                                            Log Out
                                                        </Link>
                                                    </div>
                                                </form>
                                            ) : (
                                                <form onSubmit={submit}>
                                                    <div className="text-center">
                                                        <Button
                                                            className="btn btn-primary btn-block"
                                                            processing={
                                                                processing
                                                            }
                                                        >
                                                            Resend Verification
                                                            Email
                                                        </Button>
                                                        <br />
                                                        <Link
                                                            href={route(
                                                                "logout"
                                                            )}
                                                            method="GET"
                                                            as="button"
                                                            className="btn btn-danger btn-block "
                                                        >
                                                            Log Out
                                                        </Link>
                                                    </div>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    );
}
