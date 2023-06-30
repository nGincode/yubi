import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import Label from "@/Components/Label";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("password.update"));
    };

    return (
        <Guest>
            <Head title="Reset Password" />
            <div className="authincation h-100">
                <div className="container h-100  mt-4">
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
                                                Reset Your Accounts
                                            </h4>
                                            <form onSubmit={submit}>
                                                <div className="mb-3">
                                                    <Label
                                                        forInput="email"
                                                        value="Email"
                                                    />
                                                    <div className="ml-5 mt-3">
                                                        {data.email}
                                                    </div>

                                                    <Input
                                                        type="hidden"
                                                        name="email"
                                                        value={data.email}
                                                        className="form-control"
                                                        pleaceholder="abcd123@gmail.com"
                                                        autoComplete="username"
                                                        readonly={true}
                                                        handleChange={
                                                            onHandleChange
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={errors.email}
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <Label
                                                        forInput="password"
                                                        value="New Password"
                                                    />

                                                    <Input
                                                        type="password"
                                                        name="password"
                                                        value={data.password}
                                                        className="form-control"
                                                        pleaceholder="********"
                                                        autoComplete="new-password"
                                                        handleChange={
                                                            onHandleChange
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.password
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <Label
                                                        forInput="password_confirmation"
                                                        value="Confirm Password"
                                                    />

                                                    <Input
                                                        type="password"
                                                        name="password_confirmation"
                                                        value={
                                                            data.password_confirmation
                                                        }
                                                        className="form-control"
                                                        pleaceholder="********"
                                                        handleChange={
                                                            onHandleChange
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.password_confirmation
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div className="text-center mt-4">
                                                    <Button
                                                        className="btn btn-primary btn-block"
                                                        processing={processing}
                                                    >
                                                        Update
                                                    </Button>
                                                </div>
                                            </form>
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
