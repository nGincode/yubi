import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";

import Select from "react-select";
import SelectCreate from "react-select/creatable";
import AsyncSelect from "react-select/async";

import Toastr from "@/Components/Toastr";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function SelectTo({
    search,
    create,
    multi,
    id,
    name,
    data,
    defaultValue,
    className,
    csrf_token,
    createUrl,
    method,
    api_token,
    datapost,
    setSearchValue,
    required,
}) {
    if (defaultValue && multi) {
        var dataSelect = [...defaultValue].concat(data);
    } else {
        var dataSelect = data;
    }

    const [options, setoptions] = useState(dataSelect);
    const [value, setvalue] = useState();

    const handleAsync = async (req, valueSearch) => {
        try {
            await axios({
                method: method,
                url: createUrl,
                data: req,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${api_token}`,
                    "X-CSRF-TOKEN": csrf_token,
                },
            }).then((res) => {
                if (res.data.response === "success") {
                    Toastr("success", res.data.message);
                    setoptions((options) => [
                        ...options,
                        { value: res.data.id, label: valueSearch },
                    ]);
                    setvalue({ value: res.data.id, label: valueSearch });
                } else {
                    Toastr("error", res.data.message);
                }
            });
        } catch (error) {
            Toastr("error", error.message);
        }
    };

    useEffect(() => {
        setvalue(defaultValue);
    }, [defaultValue]);

    const handleOnChangeReactSelect = (val) => {
        setvalue(val);
        if (setSearchValue) setSearchValue(val);
    };

    const handleOnChangeDefault = (val) => {
        setvalue(val.target.value);
        if (setSearchValue) setSearchValue(val.target.value);
    };

    const handleChangeCreate = (val) => {
        if (val.__isNew__) {
            Swal.fire({
                icon: "info",
                title: "Create Category",
                text: `Are You sure want to create ${val.value}`,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirm",
            }).then((result) => {
                if (result.isConfirmed) {
                    handleAsync({ ...datapost, name: val.value }, val.label);
                } else {
                    setvalue("");
                }
            });
        } else {
            setvalue({ value: val.value, label: val.label });
        }
    };
    return (
        <>
            {search && create ? (
                <SelectCreate
                    value={value}
                    name={name}
                    placeholder="Choose..."
                    onChange={handleChangeCreate}
                    options={options}
                    createOptionPosition="first"
                    className="form-control"
                    classNamePrefix="react-select"
                    id={id}
                />
            ) : search ? (
                <Select
                    options={dataSelect}
                    name={name}
                    value={value ?? ""}
                    onChange={handleOnChangeReactSelect}
                    className={"form-control " + className}
                    classNamePrefix="react-select"
                    id={id}
                    required={required}
                    isOptionDisabled={(dataSelect) => dataSelect.disabled}
                />
            ) : multi ? (
                <Select
                    id={id}
                    name={name}
                    isMulti
                    options={dataSelect}
                    value={value}
                    onChange={handleOnChangeReactSelect}
                />
            ) : (
                <select
                    name={name}
                    id={id}
                    value={value}
                    onChange={handleOnChangeDefault}
                    className={`form-control ` + (className ?? "")}
                >
                    <option value="" disabled>
                        Choose...
                    </option>
                    {data.map((val, i) => {
                        return (
                            <option key={i} value={val.value}>
                                {val.label}
                            </option>
                        );
                    })}
                </select>
            )}
        </>
    );
}
