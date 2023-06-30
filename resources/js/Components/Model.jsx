import React, { useEffect, useRef, useState } from "react";

import SelectTo from "@/Components/SelectTo";
import Button from "@/Components/Button";
import Toastr from "@/Components/Toastr";
import Validate from "@/Components/Validate";
import Input from "./Input";
import ImgUpload from "./ImgUpload";

export default function Model({
    idTable,
    header,
    modelData,
    subject,
    Api,
    setValidate,
    setValidate2,
    csrf_token,
    api_token,
}) {
    const [processing, setprocessing] = useState(false);
    const [loading, setloading] = useState(false);
    const [dataUsers, setdataUsers] = useState([]);
    const [dataStoreSelect, setdataStoreSelect] = useState([]);
    const [dataUsersSelect, setdataUsersSelect] = useState([]);

    const handleAsync = async (tipe) => {
        if (tipe === "update") {
            var data = new FormData($("#modelForm")[0]);
            data.append("id", modelData?.data.id);
            try {
                await axios({
                    method: "POST",
                    url: Api + "/update",
                    data: data,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json",
                        Authorization: `Bearer ${api_token}`,
                        "X-CSRF-TOKEN": csrf_token,
                    },
                }).then((res) => {
                    if (res.status === 200) {
                        if (res.data.response === "success") {
                            $("#close").trigger("click");
                            Toastr(res.data.response, res.data.message);
                            $(`#${idTable}`).DataTable().ajax.reload();
                            $("#modelForm")[0].reset();
                            $(".is-valid").removeClass("is-valid");

                            setTimeout(() => {
                                setprocessing(false);
                            }, 5000);
                        } else {
                            Toastr(res.data.response, res.data.message);
                            setTimeout(() => {
                                setprocessing(false);
                            }, 5000);
                        }
                    } else {
                        Toastr(res.data.response, res.data.message);
                        setTimeout(() => {
                            setprocessing(false);
                        }, 5000);
                    }
                });
            } catch (error) {
                setTimeout(() => {
                    setprocessing(false);
                }, 5000);
                Toastr("error", error.message);
            }
        } else if (tipe === "delete") {
            try {
                await axios({
                    method: "POST",
                    url: Api + "/delete",
                    data: {
                        id: modelData?.data.id,
                    },
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json",
                        Authorization: `Bearer ${api_token}`,
                        "X-CSRF-TOKEN": csrf_token,
                    },
                }).then((res) => {
                    $("#close").trigger("click");
                    Toastr(res.data.response, res.data.message);
                    $(`#${idTable}`).DataTable().ajax.reload();
                    setTimeout(() => {
                        setprocessing(false);
                    }, 5000);
                });
            } catch (error) {
                setTimeout(() => {
                    setprocessing(false);
                }, 5000);
                Toastr("error", error.message);
            }
        } else if (tipe === "view") {
            try {
                await axios({
                    method: "POST",
                    url: "api/store/all",
                    data: {
                        Active: true,
                    },
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json",
                        Authorization: `Bearer ${api_token}`,
                        "X-CSRF-TOKEN": csrf_token,
                    },
                }).then((res) => {
                    handleDataStoreSelect(res);
                });
            } catch (error) {
                Toastr("error", error.message);
                setTimeout(() => {
                    setprocessing(false);
                }, 5000);
            }

            try {
                await axios({
                    method: "POST",
                    url: "api/users/all",
                    data: {
                        nolinked: true,
                    },
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json",
                        Authorization: `Bearer ${api_token}`,
                        "X-CSRF-TOKEN": csrf_token,
                    },
                }).then((res) => {
                    handleDataUsersSelect(res);
                });
            } catch (error) {
                Toastr("error", error.message);
                setTimeout(() => {
                    setprocessing(false);
                }, 5000);
            }
        } else if (tipe === "uniquegroups") {
            try {
                await axios({
                    method: "POST",
                    url: "api/users/view",
                    data: {
                        uniquegroups: true,
                    },
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json",
                        Authorization: `Bearer ${api_token}`,
                        "X-CSRF-TOKEN": csrf_token,
                    },
                }).then((res) => {
                    handleDataUsers(res);
                });
            } catch (error) {
                Toastr("error", error.message);
                setTimeout(() => {
                    setprocessing(false);
                }, 5000);
            }
        }
    };

    useEffect(() => {
        setloading(true);
        if (subject === "Groups") {
            handleAsync("uniquegroups");
        }

        if (subject === "Contact") {
            handleAsync("view");
        }

        setTimeout(() => {
            setloading(false);

            if (subject === "Groups") {
                if (modelData) {
                    modelData?.data.permission.map((val, i) => {
                        $(`#${val}Update`).prop("checked", true);
                    });
                }
            }
        }, 200);
    }, [modelData]);

    const handleDataUsers = (res) => {
        if (res.data) {
            setdataUsers(res.data.data);
        }
    };

    const handleDataUsersSelect = (res) => {
        let resData = [];
        if (modelData?.data.users) {
            resData.push(modelData?.data.users);
        }

        res.data?.data.map((val, i) => {
            resData.push({
                value: val.id,
                label: val.username,
            });
        });

        setdataUsersSelect(resData);
    };

    const handleDataStoreSelect = (res) => {
        let resData = [];
        res.data?.data.map((val, i) => {
            resData.push({
                value: val.id,
                label: val.name,
            });
        });
        setdataStoreSelect(resData);
    };

    const handleModalClose = () => {
        $(".modal-body").html("");
        $(".modal-footer").html("");
        $("#modelForm").css("border-bottom", "unset");
        if (document.getElementById("closeImg"))
            document.getElementById("closeImg").click();
    };

    const submit = (e) => {
        setprocessing(true);
        e.preventDefault();
        if (header === "Update") {
            if (Validate("#modelForm", setValidate, setValidate2)) {
                handleAsync("update");
            } else {
                setprocessing(false);
            }
        } else if (header === "Delete") {
            handleAsync("delete");
        }
    };

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

    const selectReligion = [
        { value: "Islam", label: "Islam" },
        { value: "Kristen", label: "Kristen" },
        { value: "Katholik", label: "Katholik" },
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

    const setPermission = [
        {
            subject: "Accounts",
            data: [
                "accounts_users",
                "accounts_store",
                "accounts_groups",
                "accounts_contact",
            ],
        },
    ];

    const setDataDisplay = [
        {
            value: "All",
            label: "All",
        },
        {
            value: "Store",
            label: "Store",
        },
        {
            value: "Division",
            label: "Division",
        },
        {
            value: "Private",
            label: "Private",
        },
    ];

    return (
        <div
            id="modal"
            className="modal fade bd-modal-lg"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
            data-bs-keyboard="false"
            data-bs-backdrop="static"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <b>{header + " " + subject}</b>
                        </h5>
                        <button
                            type="button"
                            id="close"
                            className="btn-close color-red"
                            data-bs-dismiss="modal"
                            onClick={handleModalClose}
                        ></button>
                    </div>

                    {loading ? (
                        <div className="row">
                            <div className="card-body h-44 grid place-items-center ">
                                <div
                                    className="spinner-border"
                                    role="status"
                                ></div>
                            </div>
                        </div>
                    ) : (
                        <form id="modelForm" onSubmit={submit}>
                            {header === "Update" ? (
                                <div className="modal-body">
                                    {subject === "Store" ? (
                                        <div>
                                            <ImgUpload
                                                name="img"
                                                id="updateImgStore"
                                                src={modelData?.data.img}
                                                empty={
                                                    modelData?.data.img
                                                        ? false
                                                        : modelData?.data.name
                                                }
                                            />

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
                                                            name="nameUpdate"
                                                            id="nameUpdate"
                                                            className="form-control"
                                                            placeholder="Name Store"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .name
                                                            }
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
                                                            name="addressUpdate"
                                                            id="addressUpdate"
                                                            className="form-control"
                                                            placeholder="Jl. Jend xxx"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .address
                                                            }
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
                                                            name="statusUpdate"
                                                            id="statusUpdate"
                                                            data={dataActive}
                                                            defaultValue={
                                                                modelData?.data
                                                                    .active ===
                                                                "True"
                                                                    ? "Active"
                                                                    : modelData
                                                                          ?.data
                                                                          .active ===
                                                                      "False"
                                                                    ? "False"
                                                                    : ""
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Tipe
                                                        </label>
                                                        <SelectTo
                                                            name="tipeUpdate"
                                                            id="tipeUpdate"
                                                            data={dataTipe}
                                                            defaultValue={
                                                                modelData?.data
                                                                    .tipe
                                                            }
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
                                                            name="whatsappUpdate"
                                                            id="whatsappUpdate"
                                                            className="form-control"
                                                            placeholder="0822XXX"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .whatsapp
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Late Tolerance
                                                            (Minute)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="lateUpdate"
                                                            id="lateUpdate"
                                                            className="form-control"
                                                            placeholder="1 minute"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .late_tolerance
                                                            }
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
                                                                    name="firstpriodUpdate"
                                                                    id="firstpriodUpdate"
                                                                    className="form-control"
                                                                    placeholder="Start"
                                                                    defaultValue={
                                                                        modelData
                                                                            ?.data
                                                                            .firstpriod
                                                                    }
                                                                />
                                                                <SelectTo
                                                                    name="statuspriodUpdate"
                                                                    id="statuspriodUpdate"
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
                                                                    defaultValue={
                                                                        modelData
                                                                            ?.data
                                                                            .statuspriod
                                                                    }
                                                                />
                                                                <input
                                                                    type="number"
                                                                    name="endpriodUpdate"
                                                                    id="endpriodUpdate"
                                                                    className="form-control"
                                                                    placeholder="End"
                                                                    defaultValue={
                                                                        modelData
                                                                            ?.data
                                                                            .endpriod
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <font color="red">*</font>{" "}
                                                    If select now the first date
                                                    does not exceed the end date
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    ) : subject === "Contact" ? (
                                        <div>
                                            <ImgUpload
                                                name="img"
                                                id="updateImgContact"
                                                src={modelData?.data.img}
                                                empty={
                                                    modelData?.data.img
                                                        ? false
                                                        : modelData?.data.name
                                                }
                                            />

                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Full Name (KTP)
                                                        </label>
                                                        <input
                                                            name="nameUpdate"
                                                            id="nameUpdate"
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Adi Saxxx"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .name
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Date of Birth
                                                        </label>
                                                        <input
                                                            type="date"
                                                            name="date_of_birthUpdate"
                                                            id="date_of_birthUpdate"
                                                            className="form-control"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .date_of_birth
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Birth of Place
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="birth_of_placeUpdate"
                                                            id="birth_of_placeUpdate"
                                                            className="form-control"
                                                            placeholder="Bengkxx"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .birth_of_place
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Date of Entry
                                                        </label>
                                                        <input
                                                            type="date"
                                                            id="date_of_entryUpdate"
                                                            name="date_of_entryUpdate"
                                                            className="form-control"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .date_of_entry
                                                            }
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
                                                        <SelectTo
                                                            name="religionUpdate"
                                                            id="religionUpdate"
                                                            data={
                                                                selectReligion
                                                            }
                                                            defaultValue={
                                                                modelData?.data
                                                                    .religion
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Gender
                                                        </label>
                                                        <SelectTo
                                                            name="genderUpdate"
                                                            id="genderUpdate"
                                                            data={selectGender}
                                                            defaultValue={
                                                                modelData?.data
                                                                    .gender
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Address
                                                        </label>
                                                        <input
                                                            name="addressUpdate"
                                                            id="addressUpdate"
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Jl. Jend Besar xxx"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .address
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Whatsapp
                                                        </label>
                                                        <input
                                                            name="whatsappUpdate"
                                                            id="whatsappUpdate"
                                                            type="number"
                                                            className="form-control"
                                                            placeholder="0853xxxx"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .whatsapp
                                                            }
                                                        />
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
                                                            name="positionUpdate"
                                                            id="positionUpdate"
                                                            data={
                                                                selectPosition
                                                            }
                                                            defaultValue={
                                                                modelData?.data
                                                                    .position
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Division
                                                        </label>
                                                        <SelectTo
                                                            name="divisionUpdate"
                                                            id="divisionUpdate"
                                                            data={
                                                                selectDivision
                                                            }
                                                            defaultValue={
                                                                modelData?.data
                                                                    .division
                                                            }
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
                                                            name="storeUpdate"
                                                            id="storeUpdate"
                                                            data={
                                                                dataStoreSelect
                                                            }
                                                            search={true}
                                                            defaultValue={
                                                                modelData?.data
                                                                    .store
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                Status
                                                            </label>
                                                            <SelectTo
                                                                name="activeUpdate"
                                                                id="activeUpdate"
                                                                data={
                                                                    selectStatus
                                                                }
                                                                defaultValue={
                                                                    modelData
                                                                        ?.data
                                                                        .active ===
                                                                    "True"
                                                                        ? "Active"
                                                                        : modelData
                                                                              ?.data
                                                                              .active ===
                                                                          "False"
                                                                        ? "False"
                                                                        : ""
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Free Voucher
                                                        </label>
                                                        <Input
                                                            name="free_voucherUpdate"
                                                            id="free_voucherUpdate"
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="123xxx"
                                                            rupiah={true}
                                                            defaultValue={
                                                                modelData?.data
                                                                    .free_voucher ??
                                                                0
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                Account Login
                                                            </label>
                                                            <SelectTo
                                                                name="accountUpdate"
                                                                id="accountUpdate"
                                                                data={
                                                                    dataUsersSelect
                                                                }
                                                                search={true}
                                                                defaultValue={
                                                                    modelData
                                                                        ?.data
                                                                        .users ??
                                                                    ""
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    ) : subject === "Users" ? (
                                        <div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="name"
                                                        >
                                                            Username
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="usernameUpdate"
                                                            id="usernameUpdate"
                                                            className="form-control"
                                                            placeholder="Username"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .username
                                                            }
                                                            onChange={(val) => {
                                                                $(
                                                                    "#usernameUpdate"
                                                                ).val(
                                                                    val.target.value
                                                                        .replace(
                                                                            /\s/g,
                                                                            ""
                                                                        )
                                                                        .toLowerCase()
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Email
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="emailUpdate"
                                                            id="emailUpdate"
                                                            onChange={(val) => {
                                                                $(
                                                                    "#emailUpdate"
                                                                ).val(
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
                                                            defaultValue={
                                                                modelData?.data
                                                                    .email
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-12">
                                                    <div className="form-group">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="password"
                                                        >
                                                            Password Old
                                                        </label>
                                                        <input
                                                            type="password"
                                                            name="passwordUpdate"
                                                            id="passwordUpdate"
                                                            className="form-control"
                                                            placeholder="*********"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Password New
                                                        </label>
                                                        <input
                                                            type="password"
                                                            name="passwordUpdateNew"
                                                            id="passwordUpdateNew"
                                                            className="form-control"
                                                            placeholder="**********"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Confirm Password New
                                                        </label>
                                                        <input
                                                            type="password"
                                                            name="passwordUpdateNew_confirmation"
                                                            id="passwordUpdateNew_confirmation"
                                                            className="form-control"
                                                            placeholder="**********"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : subject === "Groups" ? (
                                        <div>
                                            <div className="mb-6 col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="nama">
                                                        Name Group
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="nameUpdate"
                                                        name="nameUpdate"
                                                        placeholder="Name Group"
                                                        defaultValue={
                                                            modelData?.data.name
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-6 col-md-12">
                                                <div className="form-group">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">
                                                                    <b>
                                                                        Permission
                                                                    </b>
                                                                </th>
                                                                <th scope="col">
                                                                    <center>
                                                                        <span className="badge badge-primary">
                                                                            <i className="fa fa-eye"></i>
                                                                        </span>
                                                                    </center>
                                                                </th>
                                                                <th scope="col">
                                                                    <center>
                                                                        <span className="badge badge-success">
                                                                            <i className="fa fa-plus"></i>
                                                                        </span>
                                                                    </center>
                                                                </th>
                                                                <th scope="col">
                                                                    <center>
                                                                        <span className="badge badge-warning">
                                                                            <i className="fa fa-pencil"></i>
                                                                        </span>
                                                                    </center>
                                                                </th>
                                                                <th scope="col">
                                                                    <center>
                                                                        <span className="badge badge-danger">
                                                                            <i className="fa fa-trash"></i>
                                                                        </span>
                                                                    </center>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        {setPermission.map(
                                                            (val, i) => {
                                                                return (
                                                                    <tbody
                                                                        key={i}
                                                                    >
                                                                        <tr>
                                                                            <td>
                                                                                <b>
                                                                                    {
                                                                                        val.subject
                                                                                    }
                                                                                </b>
                                                                            </td>
                                                                        </tr>

                                                                        {val.data.map(
                                                                            (
                                                                                val1,
                                                                                ii
                                                                            ) => {
                                                                                return (
                                                                                    <tr
                                                                                        key={
                                                                                            ii
                                                                                        }
                                                                                    >
                                                                                        <td
                                                                                            style={{
                                                                                                textTransform:
                                                                                                    "capitalize",
                                                                                                paddingLeft:
                                                                                                    "20px",
                                                                                            }}
                                                                                        >
                                                                                            {`${
                                                                                                ii +
                                                                                                1
                                                                                            }) ${val1
                                                                                                .replace(
                                                                                                    "_",
                                                                                                    " "
                                                                                                )
                                                                                                .replace(
                                                                                                    "_",
                                                                                                    " "
                                                                                                )
                                                                                                .replace(
                                                                                                    val.subject.toLowerCase(),
                                                                                                    ""
                                                                                                )} `}
                                                                                        </td>
                                                                                        <td>
                                                                                            <center>
                                                                                                <input
                                                                                                    type="checkbox"
                                                                                                    name="permissionUpdate[]"
                                                                                                    value={`view${val1}`}
                                                                                                    className="minimal"
                                                                                                    id={`view${val1}Update`}
                                                                                                />
                                                                                            </center>
                                                                                        </td>
                                                                                        <td>
                                                                                            <center>
                                                                                                <input
                                                                                                    type="checkbox"
                                                                                                    name="permissionUpdate[]"
                                                                                                    value={`create${val1}`}
                                                                                                    className="minimal"
                                                                                                    id={`create${val1}Update`}
                                                                                                />
                                                                                            </center>
                                                                                        </td>
                                                                                        <td>
                                                                                            <center>
                                                                                                <input
                                                                                                    type="checkbox"
                                                                                                    name="permissionUpdate[]"
                                                                                                    value={`update${val1}`}
                                                                                                    className="minimal"
                                                                                                    id={`update${val1}Update`}
                                                                                                />
                                                                                            </center>
                                                                                        </td>
                                                                                        <td>
                                                                                            <center>
                                                                                                <input
                                                                                                    type="checkbox"
                                                                                                    name="permissionUpdate[]"
                                                                                                    value={`delete${val1}`}
                                                                                                    className="minimal"
                                                                                                    id={`delete${val1}Update`}
                                                                                                />
                                                                                            </center>
                                                                                        </td>
                                                                                    </tr>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </tbody>
                                                                );
                                                            }
                                                        )}
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="mb-6 col-md-12">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Data Display :
                                                    </label>
                                                    <SelectTo
                                                        id="data_displayUpdate"
                                                        name="data_displayUpdate"
                                                        data={setDataDisplay}
                                                        defaultValue={
                                                            modelData?.data.data
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-6 col-md-12">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Target Users :
                                                    </label>
                                                    <SelectTo
                                                        id="targetUpdate"
                                                        name="targetUpdate[]"
                                                        data={dataUsers}
                                                        multi={true}
                                                        defaultValue={
                                                            modelData?.data
                                                                .users
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : subject === "Equipment Master" ? (
                                        <div>
                                            <ImgUpload
                                                name="img"
                                                id="updateImgEquipmentMaster"
                                                src={modelData?.data.img}
                                                empty={
                                                    modelData?.data.img
                                                        ? false
                                                        : modelData?.data.name
                                                }
                                            />
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="name"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="nameUpdate"
                                                            id="nameUpdate"
                                                            className="form-control"
                                                            placeholder="Name"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .name
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="password"
                                                        >
                                                            Price
                                                        </label>
                                                        <Input
                                                            rupiah={true}
                                                            type="text"
                                                            name="priceUpdate"
                                                            id="priceUpdate"
                                                            className="form-control"
                                                            placeholder="Price"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .price
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : subject === "Ingredient Master" ? (
                                        <div>
                                            <ImgUpload
                                                name="img"
                                                id="updateImgIngredientMaster"
                                                src={modelData?.data.img}
                                                empty={
                                                    modelData?.data.img
                                                        ? false
                                                        : modelData?.data.name
                                                }
                                            />
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="name"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="nameUpdate"
                                                            id="nameUpdate"
                                                            className="form-control"
                                                            placeholder="Name"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .name
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="unit"
                                                        >
                                                            Unit
                                                        </label>
                                                        <SelectTo
                                                            type="text"
                                                            name="unitUpdate"
                                                            id="unitUpdate"
                                                            className="form-control"
                                                            data={
                                                                modelData?.data
                                                                    .selectUnit
                                                            }
                                                            search={true}
                                                            defaultValue={
                                                                modelData?.data
                                                                    .valueUnit
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="password"
                                                        >
                                                            Price
                                                        </label>
                                                        <Input
                                                            rupiah={true}
                                                            type="text"
                                                            name="priceUpdate"
                                                            id="priceUpdate"
                                                            className="form-control"
                                                            placeholder="Price"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .price
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : subject === "Ingredient Category" ? (
                                        <div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="name"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="nameUpdate"
                                                            id="nameUpdate"
                                                            className="form-control"
                                                            placeholder="Name"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .name
                                                            }
                                                        />
                                                    </div>
                                                    <input
                                                        type="hidden"
                                                        name="store_idUpdate"
                                                        id="store_idUpdate"
                                                        defaultValue={
                                                            modelData?.data
                                                                .store_id
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : subject === "Library Category" ? (
                                        <div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="name"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="nameUpdate"
                                                            id="nameUpdate"
                                                            className="form-control"
                                                            placeholder="Name"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .name
                                                            }
                                                        />
                                                    </div>
                                                    <input
                                                        type="hidden"
                                                        name="store_idUpdate"
                                                        id="store_idUpdate"
                                                        defaultValue={
                                                            modelData?.data
                                                                .store_id
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : subject === "Library Sales Type" ? (
                                        <div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="name"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="nameUpdate"
                                                            id="nameUpdate"
                                                            className="form-control"
                                                            placeholder="Name"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .name
                                                            }
                                                        />
                                                    </div>
                                                    <input
                                                        type="hidden"
                                                        name="store_idUpdate"
                                                        id="store_idUpdate"
                                                        defaultValue={
                                                            modelData?.data
                                                                .store_id
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Status
                                                        </label>
                                                        <SelectTo
                                                            name="statusUpdate"
                                                            id="statusUpdate"
                                                            data={dataActive}
                                                            defaultValue={
                                                                modelData?.data
                                                                    .active ===
                                                                "True"
                                                                    ? "Active"
                                                                    : modelData
                                                                          ?.data
                                                                          .active ===
                                                                      "False"
                                                                    ? "False"
                                                                    : ""
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : subject === "Wage Base Salary" ? (
                                        <div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="name"
                                                        >
                                                            Name Contact
                                                        </label>
                                                        <input
                                                            type="text"
                                                            disabled
                                                            className="form-control"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .name
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            First Base Salary
                                                        </label>
                                                        <Input
                                                            rupiah={true}
                                                            type="text"
                                                            name="base_salary"
                                                            id="base_salary"
                                                            className="form-control"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .base_salary
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : subject === "Wage Salary Up" ? (
                                        <div>
                                            <center>Files Proof</center>
                                            <ImgUpload
                                                name="img"
                                                id="updateImgWageSalaryUp"
                                                empty={
                                                    modelData?.data.img
                                                        ? false
                                                        : modelData?.data.name
                                                }
                                            />
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="name"
                                                        >
                                                            Name Contact
                                                        </label>
                                                        <input
                                                            type="text"
                                                            disabled
                                                            className="form-control"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .name
                                                            }
                                                        />
                                                        <input
                                                            type="hidden"
                                                            className="form-control"
                                                            name="contact_id"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .id
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Up Salary
                                                        </label>
                                                        <Input
                                                            rupiah={true}
                                                            type="text"
                                                            name="up_salary"
                                                            id="up_salary"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-12">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Notes
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            name="desc"
                                                            id="desc"
                                                            defaultValue=""
                                                            style={{
                                                                height: "100px",
                                                            }}
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : subject === "Manual Stock Master" ? (
                                        <div>
                                            <ImgUpload
                                                name="img"
                                                id="updateImgStore"
                                                src={modelData?.data.img}
                                                empty={
                                                    modelData?.data.img
                                                        ? false
                                                        : modelData?.data.name
                                                }
                                            />

                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="name"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="nameUpdate"
                                                            id="nameUpdate"
                                                            className="form-control"
                                                            placeholder="Name"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .name
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Category
                                                        </label>
                                                        <SelectTo
                                                            name="categoryUpdate"
                                                            id="categoryUpdate"
                                                            search={true}
                                                            data={[
                                                                {
                                                                    value: "Raw Material",
                                                                    label: "Raw Material (Bahan Baku)",
                                                                },
                                                                {
                                                                    value: "Suplay",
                                                                    label: "Suplay",
                                                                },
                                                                {
                                                                    value: "Equipment",
                                                                    label: "Equipment (Perlengkapan)",
                                                                },
                                                            ]}
                                                            defaultValue={{
                                                                value: modelData
                                                                    ?.data
                                                                    .category,
                                                                label: modelData
                                                                    ?.data
                                                                    .category,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="password"
                                                        >
                                                            Price
                                                        </label>
                                                        <Input
                                                            rupiah={true}
                                                            type="text"
                                                            name="priceUpdate"
                                                            id="priceUpdate"
                                                            className="form-control"
                                                            placeholder="Price"
                                                            defaultValue={
                                                                modelData?.data
                                                                    .price
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="unit"
                                                        >
                                                            Unit
                                                        </label>
                                                        <SelectTo
                                                            type="text"
                                                            name="unitUpdate"
                                                            id="unitUpdate"
                                                            className="form-control"
                                                            data={
                                                                modelData?.data
                                                                    .selectUnit
                                                            }
                                                            search={true}
                                                            defaultValue={
                                                                modelData?.data
                                                                    .valueUnit
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Division
                                                        </label>
                                                        <SelectTo
                                                            name="divisionUpdate"
                                                            id="divisionUpdate"
                                                            data={
                                                                selectDivision
                                                            }
                                                            defaultValue={
                                                                modelData?.data
                                                                    .division
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    ) : (
                                        "Gagal Mengambil Data"
                                    )}
                                </div>
                            ) : header === "Delete" ? (
                                <>
                                    {subject === "Equipment Changed" ? (
                                        <div className="modal-body">
                                            <div>
                                                Sure you want to delete ? then
                                                the qty will be returned as
                                                before
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {modelData?.data?.conected ? (
                                                <div className="modal-body">
                                                    Can not be removed, because
                                                    it is used by{" "}
                                                    {modelData?.data.conected}
                                                </div>
                                            ) : (
                                                <div className="modal-body">
                                                    <div>
                                                        Sure you want to delete
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </>
                            ) : header === "View" ? (
                                <div className="modal-body">
                                    <div>View</div>
                                </div>
                            ) : (
                                <div className="modal-body color-danger">
                                    Gagal Mengambil Data
                                </div>
                            )}
                            <div className="modal-footer">
                                {header == "Delete" ? (
                                    <>
                                        {!modelData?.data?.conected && (
                                            <Button
                                                type="submit"
                                                className={
                                                    "btn btn-danger btn-block"
                                                }
                                                processing={processing}
                                            >
                                                Delete
                                            </Button>
                                        )}
                                    </>
                                ) : (
                                    <Button
                                        type="submit"
                                        className={"btn btn-primary btn-block"}
                                        processing={processing}
                                    >
                                        Save
                                    </Button>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
