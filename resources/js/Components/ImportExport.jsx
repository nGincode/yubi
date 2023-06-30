import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import Toastr from "@/Components/Toastr";
import Button from "@/Components/Button";
import SelectTo from "./SelectTo";

export default function ImportExport({
    data,
    storeSelect,
    permission,
    url,
    subject,
}) {
    const [loading, setloading] = useState(false);
    const [type, settype] = useState(1);
    const [button, setbutton] = useState(1);
    const [processing, setprocessing] = useState(false);
    const [fileUpload, setfileUpload] = useState();
    const [info, setinfo] = useState();
    const [SearchValue, setSearchValue] = useState();

    const handleAsync = async (tipe) => {
        if (tipe === "export") {
            setloading("Export");

            try {
                await axios({
                    method: "POST",
                    url: url + "/export",
                    data: data,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json",
                        Authorization: `Bearer ${data.token_api}`,
                        "X-CSRF-TOKEN": data.csrf_token,
                    },
                }).then((res) => {
                    const headerContentDisp =
                        res.headers["content-disposition"];
                    const filename =
                        headerContentDisp &&
                        headerContentDisp
                            .split("filename=")[1]
                            .replace(/["']/g, "");
                    const contentType = res.headers["content-type"];

                    const blob = new Blob([res.data], { contentType });
                    const href = window.URL.createObjectURL(blob);

                    const el = document.createElement("a");
                    el.setAttribute("href", href);
                    el.setAttribute(
                        "download",
                        filename || (config && config.filename) || "someFile"
                    );
                    el.click();

                    window.URL.revokeObjectURL(blob);

                    setloading(false);
                    setTimeout(() => {
                        setprocessing(false);
                    }, 5000);
                    Toastr("success", "Download Successful");
                });
            } catch (error) {
                setTimeout(() => {
                    setloading(false);
                }, 5000);
                Toastr("error", error.message);
            }
        } else if (tipe === "import") {
            var form = new FormData($("#importForm")[0]);
            form.append("type", type);
            form.append(
                "store_id",
                SearchValue ? SearchValue.value : data.store_id
            );
            form.append("file", fileUpload[0]);
            setloading("Import");
            try {
                await axios({
                    method: "POST",
                    url: url + "/import",
                    data: form,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json",
                        Authorization: `Bearer ${data.token_api}`,
                        "X-CSRF-TOKEN": data.csrf_token,
                    },
                }).then((res) => {
                    setinfo(res.data.info);
                    setloading(false);
                    setTimeout(() => {
                        setprocessing(false);
                    }, 5000);
                    Toastr(res.data.response, res.data.message);
                    if (res.data.response === "success") {
                        $("#importForm")[0].reset();
                        $("#closeImport").trigger("click");
                        $("#DataTables").DataTable().ajax.reload();
                        setbutton(1);
                        settype(1);
                        setfileUpload(null);
                    }
                });
            } catch (error) {
                Toastr("error", error.message);
                setTimeout(() => {
                    setprocessing(false);
                    setloading(false);
                }, 5000);
            }
        }
    };

    const onDrop = useCallback(
        (acceptedFiles) => {
            setfileUpload(acceptedFiles);
            setinfo(null);
        },
        [fileUpload]
    );

    const {
        acceptedFiles,
        fileRejections,
        isDragActive,
        isDragAccept,
        isDragReject,
        getRootProps,
        getInputProps,
    } = useDropzone({
        onDrop,
        accept: {
            "text/csv": [],
        },
        multiple: false,
    });

    const acceptedFileItems = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map((e) => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    const submit = (e) => {
        setprocessing(true);
        e.preventDefault();
        handleAsync("import");
    };

    return (
        <>
            <div className="btn-group" role="group">
                <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Import/Export
                </button>
                <div className="dropdown-menu">
                    <a
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target=".bd-modal-import"
                        id="import"
                    >
                        Import
                    </a>
                    <a
                        className="dropdown-item"
                        onClick={() => {
                            handleAsync("export");
                        }}
                    >
                        Export
                    </a>
                </div>
            </div>

            {loading ? (
                <div
                    style={{ zIndex: "9999" }}
                    className=" fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center"
                >
                    <div className="flex justify-center items-center">
                        <div
                            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <h2 className="text-centertext-xl font-semibold mt-3 text-white-50">
                        {loading} Data
                    </h2>
                </div>
            ) : (
                ""
            )}

            <div
                className="modal fade bd-modal-import"
                tabIndex="-1"
                role="dialog"
                aria-hidden="true"
                data-bs-keyboard="false"
                data-bs-backdrop="static"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header ">
                            <h5 className="modal-title">
                                <b>Import</b>
                            </h5>
                            <button
                                type="button"
                                id="closeImport"
                                className="btn-close color-red"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <form id="importForm" onSubmit={submit}>
                            <div className="modal-body">
                                {button < 2 ? (
                                    <>
                                        <div
                                            className={
                                                type === 1
                                                    ? "form-check mb-2 border-solid border-2 border-sky-500 rounded-md  cursor-pointer"
                                                    : "form-check cursor-pointer mb-2 border-2 rounded-md "
                                            }
                                            onClick={() => {
                                                settype(1);
                                            }}
                                        >
                                            <b>Modify {subject}</b>
                                            <div>
                                                Add new items and update your
                                                existing ones. Items cannot be
                                                deleted, only altered
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                type === 2
                                                    ? "form-check border-solid border-2 border-sky-500 rounded-md cursor-pointer"
                                                    : "form-check cursor-pointer border-2 rounded-md "
                                            }
                                            onClick={() => {
                                                settype(2);
                                            }}
                                        >
                                            <b>Replace {subject}</b>
                                            <div>
                                                Overwrite your existing items.
                                                All items will be deleted and
                                                replaced
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-center">
                                            {type === 1 ? (
                                                <b className="text-red-400">
                                                    Modify {subject}
                                                </b>
                                            ) : (
                                                <b className="text-gray-600">
                                                    Replace {subject}
                                                </b>
                                            )}
                                        </h3>
                                        To upload items* in bulk, first download
                                        our{" "}
                                        <a
                                            onClick={() => {
                                                handleAsync("export");
                                            }}
                                            className="text-cyan-600"
                                        >
                                            CSV Template
                                        </a>
                                        .
                                        <br />
                                        Then, fill or update the items
                                        information based on this{" "}
                                        <a className="text-cyan-600">
                                            Import Items Guide
                                        </a>{" "}
                                        <br />
                                        <small>
                                            <i>
                                                *Max 10.000 items in one file to
                                                optimize the import performance.{" "}
                                            </i>
                                        </small>
                                        <br />
                                        <br />
                                        Having problem importing your items?{" "}
                                        <a className="text-cyan-600">
                                            Contact us
                                        </a>
                                        {permission === "All" ? (
                                            <div className="mt-2 col-md-12">
                                                <div className="form-group">
                                                    <SelectTo
                                                        name="store_id"
                                                        id="store_id"
                                                        data={storeSelect}
                                                        search={true}
                                                        defaultValue={""}
                                                        setSearchValue={
                                                            setSearchValue
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <input
                                                type="hidden"
                                                name="store_id"
                                                value={data.store_id}
                                            />
                                        )}
                                        <section className="container">
                                            <div
                                                {...getRootProps({
                                                    className: "dropzone",
                                                })}
                                            >
                                                <input {...getInputProps()} />
                                                {isDragAccept && (
                                                    <p>
                                                        All files will be
                                                        accepted
                                                    </p>
                                                )}
                                                {isDragReject && (
                                                    <p>
                                                        Some files will be
                                                        rejected
                                                    </p>
                                                )}
                                                {!isDragActive && (
                                                    <>
                                                        Drag 'n' drop some files
                                                        here, or click to select
                                                        files
                                                        <em>
                                                            (Only *.csv will be
                                                            accepted)
                                                        </em>
                                                    </>
                                                )}

                                                <ul className="text-green-600 mt-2">
                                                    {fileUpload
                                                        ? acceptedFileItems
                                                        : ""}
                                                </ul>
                                                <div className="text-red-600">
                                                    {info}
                                                </div>
                                            </div>
                                            <aside>
                                                <ul className="text-red-600">
                                                    {fileRejectionItems}
                                                </ul>
                                            </aside>
                                        </section>
                                    </>
                                )}
                            </div>
                            <div className="modal-footer">
                                {button < 2 ? (
                                    <a
                                        className="btn btn-primary"
                                        onClick={() => {
                                            setbutton(button + 1);
                                        }}
                                    >
                                        Next
                                    </a>
                                ) : (
                                    <>
                                        <a
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                setbutton(1);
                                            }}
                                        >
                                            Back
                                        </a>
                                        {fileUpload ? (
                                            <Button
                                                type="submit"
                                                className="btn btn-primary"
                                                processing={processing}
                                                onClick={() => {
                                                    setbutton(button + 1);
                                                }}
                                            >
                                                Upload
                                            </Button>
                                        ) : (
                                            ""
                                        )}
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
