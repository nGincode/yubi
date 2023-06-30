import React, { useState, useRef, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

import Swal from "sweetalert2";
// import "sweetalert2/dist/sweetalert2.min.css";

import Skeleton from "@/Components/Skeleton";
import DataTables from "@/Components/DataTables";
import SelectTo from "@/Components/SelectTo";
import Button from "@/Components/Button";
import Toastr from "@/Components/Toastr";
import Validate from "@/Components/Validate";
import PermissionData from "@/Components/PermissionData";
import Input from "@/Components/Input";
import ImgUpload from "@/Components/ImgUpload";

export default function AccountsContact(props) {
    const urlPage = "accounts_contact";
    const namePage = "Contact";
    const permission = PermissionData(
        "Auth",
        props.permission,
        props.groups.groups.data,
        urlPage
    );

    //state
    const [processing, setprocessing] = useState(false);
    const [dataContact, setdataContact] = useState([]);

    //post
    const handleAsync = async (tipe) => {
        if (tipe === "create") {
            var data = new FormData($("#createForm")[0]);
            if (props.groups?.groups.data !== "All") {
                data.append("users_id", props.auth.user.uuid);
            }
            try {
                await axios({
                    method: "POST",
                    url: "/api/contact/create",
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
                    if (res.data.response === "success") {
                        Toastr(res.data.response, res.data.message);
                        handleAsync("view");
                        $("#DataTables").DataTable().ajax.reload();
                        if (props.groups?.groups.data === "All") {
                            $("#createForm")[0].reset();
                        } else {
                            setTimeout(() => {
                                window.location.reload();
                            }, 5000);
                        }
                        $(".is-valid").removeClass("is-valid");
                    } else if (res.data.data) {
                        Swal.fire({
                            title: `<b>Name Detected</b>`,
                            text: ` Are You Right With The Name ${res.data.data.name} ?`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                axios({
                                    method: "POST",
                                    url: "/api/contact/create",
                                    data: {
                                        users_id: props.auth.user.uuid,
                                        id: res.data.data.uuid,
                                    },
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                        Accept: "application/json",
                                        Authorization: `Bearer ${props.auth.user.token_api}`,
                                        "X-CSRF-TOKEN": props.csrf_token,
                                    },
                                }).then((res) => {
                                    Toastr(res.data.response, res.data.message);
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 5000);
                                });
                            }
                        });
                    } else {
                        Toastr(res.data.response, res.data.message);
                    }
                });
            } catch (error) {
                Toastr("error", error.message);
                setTimeout(() => {
                    setprocessing(false);
                }, 5000);
            }
        } else if (tipe === "update") {
            var data = new FormData($("#createForm")[0]);
            data.append("id", dataContact?.uuid);
            data.append("activeUpdate", dataContact?.active);
            data.append("date_of_entryUpdate", dataContact?.date_of_entry);
            data.append("positionUpdate", dataContact?.position);
            data.append("divisionUpdate", dataContact?.division);
            data.append("storeUpdate", dataContact?.store.uuid);
            data.append("activeUpdate", dataContact?.active);
            data.append("free_voucherUpdate", dataContact?.free_voucher);
            try {
                await axios({
                    method: "POST",
                    url: "/api/contact/update",
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
                        if (!dataContact?.id) {
                            $("#createForm")[0].reset();
                            $(".is-valid").removeClass("is-valid");
                        }
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
    const selectReligion = [
        { value: "Islam", label: "Islam" },
        { value: "Kristen", label: "Kristen" },
        { value: "Katolik", label: "Katolik" },
        { value: "Buddha", label: "Buddha" },
        { value: "Konghucu", label: "Konghucu" },
    ];

    const selectGender = [
        { value: "Female", label: "Female" },
        { value: "Male", label: "Male" },
    ];

    const selectDivision = [
        { value: "Founder", label: "Founder" },
        { value: "Head Manager", label: "Head Manager" },
        { value: "Accounting", label: "Accounting" },
        { value: "Technology", label: "Technology" },
        { value: "Marketing", label: "Marketing" },
        {
            value: "Human Resource and General Affai",
            label: "Human Resource and General Affai",
        },
        { value: "Logistics", label: "Logistics" },
        { value: "Production Kitchen", label: "Production Kitchen" },
        { value: "Head Outlet", label: "Head Outlet" },
        { value: "Cashier", label: "Cashier" },
        { value: "Bartender", label: "Bartender" },
        { value: "Kitchen", label: "Kitchen" },
        { value: "Service Crew", label: "Service Crew" },
        { value: "Music", label: "Music" },
        { value: "Parking", label: "Parking" },
        ,
    ];

    const selectPosition = [
        { value: "Owner", label: "Owner" },
        {
            value: "CEO (Chief Executive Office) ",
            label: "CEO (Chief Executive Office) ",
        },
        {
            value: "COO (Chief Operating Officer) ",
            label: "COO (Chief Operating Officer) ",
        },
        {
            value: "CMO (Chief Marketing Officer)",
            label: "CMO (Chief Marketing Officer)",
        },
        {
            value: "CTO (Chief Technology Officer)",
            label: "CTO (Chief Technology Officer)",
        },
        {
            value: "CFO (Chief Financial Officer)",
            label: "CFO (Chief Financial Officer)",
        },
        { value: "Manager", label: "Manager" },
        { value: "Supervisor", label: "Supervisor" },
        { value: "Leader", label: "Leader" },
        { value: "Staf", label: "Staf" },
        { value: "Freelance", label: "Freelance" },
    ];

    const selectStatus = [
        { value: "True", label: "Active" },
        { value: "False", label: "Resign" },
    ];

    const setValidate = {
        name: {
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        date_of_birth: {
            required: true,
            date: true,
        },
        birth_of_place: {
            required: true,
        },
        date_of_entry: {
            required: true,
            date: true,
        },
        religion: {
            required: true,
        },
        gender: {
            required: true,
        },
        address: {
            required: true,
            minlength: 3,
            maxlength: 191,
        },
        status: {
            required: true,
        },
        whatsapp: {
            required: true,
            minlength: 10,
            maxlength: 15,
        },
        position: {
            required: true,
        },
        division: {
            required: true,
        },
        active: {
            required: true,
        },
        free_voucher: {
            required: true,
        },
    };

    const setValidateUpdate = {
        nameUpdate: {
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        date_of_birthUpdate: {
            required: true,
            date: true,
        },
        birth_of_placeUpdate: {
            required: true,
        },
        religionUpdate: {
            required: true,
        },
        genderUpdate: {
            required: true,
        },
        addressUpdate: {
            required: true,
            minlength: 3,
            maxlength: 191,
        },
        whatsappUpdate: {
            required: true,
            minlength: 10,
            maxlength: 15,
        },
    };

    const setValidateUpdate2 = ["storeUpdate"];

    //submit
    const submit = (e) => {
        setprocessing(true);
        e.preventDefault();

        if (dataContact?.id) {
            if (Validate("#createForm", setValidateUpdate)) {
                handleAsync("update");
            } else {
                setprocessing(false);
            }
        } else {
            if (Validate("#createForm", setValidate, ["store"])) {
                handleAsync("create");
            } else {
                setprocessing(false);
            }
        }
    };

    //useEffect
    useEffect(() => {
        $("#main-wrapper").removeClass("menu-toggle");
        $(".hamburger ").removeClass("is-active");

        if (props.groups?.groups.data !== "All") {
            setdataContact(props.contact);
        }
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

            {!dataContact ? (
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
                                            <ImgUpload
                                                name="img"
                                                id="img"
                                                src={dataContact?.img}
                                                empty={
                                                    dataContact?.img
                                                        ? false
                                                        : dataContact?.name
                                                }
                                            />
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Full Name (KTP)
                                                        </label>
                                                        {dataContact?.name ? (
                                                            <input
                                                                name="nameUpdate"
                                                                id="nameUpdate"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Adi Saxxx"
                                                                defaultValue={
                                                                    dataContact?.name ??
                                                                    ""
                                                                }
                                                            />
                                                        ) : (
                                                            <input
                                                                name="name"
                                                                id="name"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Adi Saxxx"
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Date of Birth
                                                        </label>
                                                        {dataContact?.date_of_birth ? (
                                                            <input
                                                                type="date"
                                                                name="date_of_birthUpdate"
                                                                id="date_of_birthUpdate"
                                                                className="form-control"
                                                                defaultValue={
                                                                    dataContact?.date_of_birth ??
                                                                    ""
                                                                }
                                                            />
                                                        ) : (
                                                            <input
                                                                type="date"
                                                                name="date_of_birth"
                                                                id="date_of_birth"
                                                                className="form-control"
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Birth of Place
                                                        </label>
                                                        {dataContact?.birth_of_place ? (
                                                            <input
                                                                type="text"
                                                                name="birth_of_placeUpdate"
                                                                id="birth_of_placeUpdate"
                                                                className="form-control"
                                                                placeholder="Bengkxx"
                                                                defaultValue={
                                                                    dataContact?.birth_of_place ??
                                                                    ""
                                                                }
                                                            />
                                                        ) : (
                                                            <input
                                                                type="text"
                                                                name="birth_of_place"
                                                                id="birth_of_place"
                                                                className="form-control"
                                                                placeholder="Bengkxx"
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Date of Entry
                                                        </label>

                                                        <input
                                                            type="date"
                                                            id="date_of_entry"
                                                            name="date_of_entry"
                                                            className="form-control"
                                                            defaultValue=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Religion
                                                        </label>

                                                        {dataContact?.religion ? (
                                                            <SelectTo
                                                                name="religionUpdate"
                                                                id="religionUpdate"
                                                                data={
                                                                    selectReligion
                                                                }
                                                                defaultValue={
                                                                    dataContact?.religion ??
                                                                    ""
                                                                }
                                                            />
                                                        ) : (
                                                            <SelectTo
                                                                name="religion"
                                                                id="religion"
                                                                data={
                                                                    selectReligion
                                                                }
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Gender
                                                        </label>

                                                        {dataContact?.gender ? (
                                                            <SelectTo
                                                                name="genderUpdate"
                                                                id="genderUpdate"
                                                                data={
                                                                    selectGender
                                                                }
                                                                defaultValue={
                                                                    dataContact?.gender ??
                                                                    ""
                                                                }
                                                            />
                                                        ) : (
                                                            <SelectTo
                                                                name="gender"
                                                                id="gender"
                                                                data={
                                                                    selectGender
                                                                }
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Address
                                                        </label>
                                                        {dataContact?.address ? (
                                                            <input
                                                                name="addressUpdate"
                                                                id="addressUpdate"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Jl. Jend Besar xxx"
                                                                defaultValue={
                                                                    dataContact?.address ??
                                                                    ""
                                                                }
                                                            />
                                                        ) : (
                                                            <input
                                                                name="address"
                                                                id="address"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Jl. Jend Besar xxx"
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Whatsapp
                                                        </label>
                                                        {dataContact?.whatsapp ? (
                                                            <input
                                                                name="whatsappUpdate"
                                                                id="whatsappUpdate"
                                                                type="number"
                                                                className="form-control"
                                                                placeholder="0853xxxx"
                                                                defaultValue={
                                                                    dataContact?.whatsapp ??
                                                                    ""
                                                                }
                                                            />
                                                        ) : (
                                                            <input
                                                                name="whatsapp"
                                                                id="whatsapp"
                                                                type="number"
                                                                className="form-control"
                                                                placeholder="0853xxxx"
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Position
                                                        </label>
                                                        <SelectTo
                                                            name="position"
                                                            id="position"
                                                            data={
                                                                selectPosition
                                                            }
                                                            defaultValue=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Division
                                                        </label>
                                                        <SelectTo
                                                            name="division"
                                                            id="division"
                                                            data={
                                                                selectDivision
                                                            }
                                                            defaultValue=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Store
                                                        </label>
                                                        <SelectTo
                                                            name="store"
                                                            id="store"
                                                            data={
                                                                props.storeActiveSelect
                                                            }
                                                            search={true}
                                                            defaultValue=""
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="active"
                                                            id="active"
                                                            value={"True"}
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

                    {permission["view"] &&
                        props.groups?.groups.data === "All" && (
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
                                                        title: "Name",
                                                    },
                                                    {
                                                        data: "namestore",
                                                        title: "Store",
                                                    },
                                                    {
                                                        data: "position",
                                                        title: "Position",
                                                    },
                                                    {
                                                        data: "entry",
                                                        title: "Date Of Entry",
                                                    },
                                                    {
                                                        data: "action",
                                                        title: "Action",
                                                        orderable: false,
                                                        width: 50,
                                                        className: "text-right",
                                                    },
                                                ]}
                                                API="/api/contact"
                                                Method="POST"
                                                Subject="Contact"
                                                setValidate={setValidateUpdate}
                                                setValidate2={
                                                    setValidateUpdate2
                                                }
                                                csrf_token={props.csrf_token}
                                                api_token={`Bearer ${props.auth.user.token_api}`}
                                                Action={
                                                    permission["managePerm"]
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            ) : (
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
                                            <ImgUpload
                                                name="img"
                                                id="img"
                                                src={dataContact?.img}
                                                empty={
                                                    dataContact?.img
                                                        ? false
                                                        : dataContact?.name
                                                }
                                            />
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Full Name (KTP)
                                                        </label>
                                                        {dataContact?.name ? (
                                                            <input
                                                                name="nameUpdate"
                                                                id="nameUpdate"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Adi Saxxx"
                                                                defaultValue={
                                                                    dataContact?.name ??
                                                                    ""
                                                                }
                                                            />
                                                        ) : (
                                                            <input
                                                                name="name"
                                                                id="name"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Adi Saxxx"
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Date of Birth
                                                        </label>
                                                        {dataContact?.date_of_birth ? (
                                                            <input
                                                                type="date"
                                                                name="date_of_birthUpdate"
                                                                id="date_of_birthUpdate"
                                                                className="form-control"
                                                                defaultValue={
                                                                    dataContact?.date_of_birth ??
                                                                    ""
                                                                }
                                                            />
                                                        ) : (
                                                            <input
                                                                type="date"
                                                                name="date_of_birth"
                                                                id="date_of_birth"
                                                                className="form-control"
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Birth of Place
                                                        </label>
                                                        {dataContact?.birth_of_place ? (
                                                            <input
                                                                type="text"
                                                                name="birth_of_placeUpdate"
                                                                id="birth_of_placeUpdate"
                                                                className="form-control"
                                                                placeholder="Bengkxx"
                                                                defaultValue={
                                                                    dataContact?.birth_of_place ??
                                                                    ""
                                                                }
                                                            />
                                                        ) : (
                                                            <input
                                                                type="text"
                                                                name="birth_of_place"
                                                                id="birth_of_place"
                                                                className="form-control"
                                                                placeholder="Bengkxx"
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Date of Entry
                                                        </label>

                                                        {props.groups?.groups
                                                            .data !== "All" ? (
                                                            <input
                                                                type="date"
                                                                readOnly
                                                                className="form-control"
                                                                defaultValue={
                                                                    dataContact?.date_of_entry ??
                                                                    ""
                                                                }
                                                            />
                                                        ) : (
                                                            <input
                                                                type="date"
                                                                id="date_of_entry"
                                                                name="date_of_entry"
                                                                className="form-control"
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Religion
                                                        </label>

                                                        {dataContact?.religion ? (
                                                            <SelectTo
                                                                name="religionUpdate"
                                                                id="religionUpdate"
                                                                data={
                                                                    selectReligion
                                                                }
                                                                defaultValue={
                                                                    dataContact?.religion ??
                                                                    ""
                                                                }
                                                            />
                                                        ) : (
                                                            <SelectTo
                                                                name="religion"
                                                                id="religion"
                                                                data={
                                                                    selectReligion
                                                                }
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Gender
                                                        </label>

                                                        {dataContact?.gender ? (
                                                            <SelectTo
                                                                name="genderUpdate"
                                                                id="genderUpdate"
                                                                data={
                                                                    selectGender
                                                                }
                                                                defaultValue={
                                                                    dataContact?.gender ??
                                                                    ""
                                                                }
                                                            />
                                                        ) : (
                                                            <SelectTo
                                                                name="gender"
                                                                id="gender"
                                                                data={
                                                                    selectGender
                                                                }
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Address
                                                        </label>
                                                        {dataContact?.address ? (
                                                            <input
                                                                name="addressUpdate"
                                                                id="addressUpdate"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Jl. Jend Besar xxx"
                                                                defaultValue={
                                                                    dataContact?.address ??
                                                                    ""
                                                                }
                                                            />
                                                        ) : (
                                                            <input
                                                                name="address"
                                                                id="address"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Jl. Jend Besar xxx"
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Whatsapp
                                                        </label>
                                                        {dataContact?.whatsapp ? (
                                                            <input
                                                                name="whatsappUpdate"
                                                                id="whatsappUpdate"
                                                                type="number"
                                                                className="form-control"
                                                                placeholder="0853xxxx"
                                                                defaultValue={
                                                                    dataContact?.whatsapp ??
                                                                    ""
                                                                }
                                                            />
                                                        ) : (
                                                            <input
                                                                name="whatsapp"
                                                                id="whatsapp"
                                                                type="number"
                                                                className="form-control"
                                                                placeholder="0853xxxx"
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Position
                                                        </label>
                                                        {props.groups?.groups
                                                            .data !== "All" ? (
                                                            <input
                                                                readOnly
                                                                className="form-control"
                                                                value={
                                                                    dataContact?.position ??
                                                                    ""
                                                                }
                                                            />
                                                        ) : (
                                                            <SelectTo
                                                                name="position"
                                                                id="position"
                                                                data={
                                                                    selectPosition
                                                                }
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Division
                                                        </label>
                                                        {props.groups?.groups
                                                            .data !== "All" ? (
                                                            <input
                                                                readOnly
                                                                className="form-control"
                                                                value={
                                                                    dataContact?.division ??
                                                                    ""
                                                                }
                                                            />
                                                        ) : (
                                                            <SelectTo
                                                                name="division"
                                                                id="division"
                                                                data={
                                                                    selectDivision
                                                                }
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Store
                                                        </label>
                                                        {props.groups?.groups
                                                            .data !== "All" ? (
                                                            <input
                                                                readOnly
                                                                className="form-control"
                                                                value={
                                                                    dataContact?.store
                                                                        ? dataContact
                                                                              .store
                                                                              .name
                                                                        : ""
                                                                }
                                                            />
                                                        ) : (
                                                            <SelectTo
                                                                name="store"
                                                                id="store"
                                                                data={
                                                                    props.storeActiveSelect
                                                                }
                                                                search={true}
                                                                defaultValue=""
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                Status
                                                            </label>
                                                            {props.groups
                                                                ?.groups
                                                                .data !==
                                                            "All" ? (
                                                                <input
                                                                    readOnly
                                                                    className="form-control"
                                                                    value={
                                                                        dataContact?.active ===
                                                                        "True"
                                                                            ? "Active"
                                                                            : dataContact?.active ===
                                                                              "False"
                                                                            ? "False"
                                                                            : ""
                                                                    }
                                                                />
                                                            ) : (
                                                                <SelectTo
                                                                    name="active"
                                                                    id="active"
                                                                    data={
                                                                        selectStatus
                                                                    }
                                                                    defaultValue=""
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {props.groups?.groups.data ===
                                                "All" && (
                                                <div className="row">
                                                    <div className="mb-3 col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                Free Vouchers
                                                            </label>
                                                            <Input
                                                                className="form-control"
                                                                rupiah={true}
                                                                read={true}
                                                                defaultValue={
                                                                    ""
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
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

                    {permission["view"] &&
                        props.groups?.groups.data === "All" && (
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
                                                        title: "Name",
                                                    },
                                                    {
                                                        data: "namestore",
                                                        title: "Store",
                                                    },
                                                    {
                                                        data: "position",
                                                        title: "Position",
                                                    },
                                                    {
                                                        data: "entry",
                                                        title: "Date Of Entry",
                                                    },
                                                    {
                                                        data: "cuti",
                                                        title: "Leave",
                                                    },
                                                    {
                                                        data: "action",
                                                        title: "Action",
                                                        orderable: false,
                                                        width: 50,
                                                        className: "text-right",
                                                    },
                                                ]}
                                                API="/api/contact"
                                                Method="POST"
                                                Subject="Contact"
                                                setValidate={setValidateUpdate}
                                                setValidate2={
                                                    setValidateUpdate2
                                                }
                                                csrf_token={props.csrf_token}
                                                api_token={`Bearer ${props.auth.user.token_api}`}
                                                Action={
                                                    permission["managePerm"]
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            )}
        </>
    );
}
