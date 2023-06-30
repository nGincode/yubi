import React, { useState, useRef, useEffect } from "react";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import QRCode from "qrcode";

import Model from "@/Components/Model";
import Toastr from "@/Components/Toastr";
import axios, { Axios } from "axios";

export default function DataTables({
    idTable = "DataTables",
    urlTableAll = "all",
    urlTableView = "view",
    columns,
    API,
    Method,
    Action,
    DataDateRange,
    Subject,
    setValidate,
    setValidate2,
    csrf_token,
    api_token,
    datePickerReload,
}) {
    const [modelHeader, setmodelHeader] = useState();
    const [modelData, setmodelData] = useState();

    const handleAsync = async (id) => {
        if (id) {
            try {
                await axios({
                    method: "POST",
                    url: `${API}/${urlTableView}`,
                    data: {
                        id: id,
                    },
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json",
                        Authorization: `Bearer ${api_token}`,
                        "X-CSRF-TOKEN": csrf_token,
                    },
                }).then((res) => {
                    setmodelData(res.data);
                });
            } catch (error) {
                Toastr("error", error.message);
            }
        } else {
            try {
                var table = await $(`#${idTable}`).DataTable({
                    columns: columns,
                    processing: true,
                    ajax: {
                        async: true,
                        url: `${API}/${urlTableAll}`,
                        type: Method,
                        data: function (d) {
                            d.Action = Action;
                            d.DataDateRange = DataDateRange;
                        },
                        datatype: "json",
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${api_token}`,
                            "X-CSRF-TOKEN": csrf_token,
                        },
                        complete: function () {},
                    },
                    aaSorting: [],
                    language: {
                        loadingRecords: "&nbsp;",
                        // processing: '<div class="spinner"></div>',
                        paginate: {
                            next: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
                            previous:
                                '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
                        },
                        sSearch: "Search all columns:",
                        sZeroRecords: "No records to display",
                        sEmptyTable: "No data available in table",
                    },
                    fnRowCallback: function (nRow, aData) {
                        if (aData["active"] === "False") {
                            $(nRow).css("color", "red");
                        }
                    },
                });

                $(`#${idTable} tbody`).on("click", "a", function () {
                    const button = table.row($(this).parents("tr")).selector
                        .rows.prevObject[0].id;

                    const dataTables = table.row($(this).parents("tr")).data();
                    const id = dataTables["id"];

                    if (!id) {
                        Toastr("error", "id failed to get");
                    }
                    $("#modelForm")[0].reset();

                    if (button === "view") {
                        handleAsync(id);
                        setmodelHeader("View");
                    }

                    if (button === "update") {
                        handleAsync(id);
                        setmodelHeader("Update");
                    }

                    if (button === "delete") {
                        handleAsync(id);
                        setmodelHeader("Delete");
                    }

                    if (button === "acc") {
                        Swal.fire({
                            title: "Are you sure?",
                            text: `Acc ${Subject} ${dataTables["name"]} (${dataTables["date"]})`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                axios({
                                    method: "POST",
                                    url: API + "/acc",
                                    data: {
                                        id: id,
                                        acc: true,
                                    },
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: `Bearer ${api_token}`,
                                        "X-CSRF-TOKEN": csrf_token,
                                    },
                                }).then((res) => {
                                    Toastr(res.data.response, res.data.message);
                                    if (res.data.response === "success") {
                                        $(`#DataTables`)
                                            .DataTable()
                                            .ajax.reload();
                                        if ("DataTables" !== idTable) {
                                            $(`#${idTable}`)
                                                .DataTable()
                                                .ajax.reload();
                                        }
                                    }
                                });
                            }
                        });
                    }

                    if (button === "rejected") {
                        Swal.fire({
                            title: "Are you sure?",
                            text: `Rejected ${Subject} ${dataTables["name"]} (${dataTables["date"]})`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                axios({
                                    method: "POST",
                                    url: API + "/rejected",
                                    data: {
                                        id: id,
                                        rejected: 2,
                                    },
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: `Bearer ${api_token}`,
                                        "X-CSRF-TOKEN": csrf_token,
                                    },
                                }).then((res) => {
                                    Toastr(res.data.response, res.data.message);
                                    if (res.data.response === "success") {
                                        $(`#DataTables`)
                                            .DataTable()
                                            .ajax.reload();
                                        if ("DataTables" !== idTable) {
                                            $(`#${idTable}`)
                                                .DataTable()
                                                .ajax.reload();
                                        }
                                    }
                                });
                            }
                        });
                    }

                    if (button === "cancel") {
                        Swal.fire({
                            title: "Are you sure?",
                            text: `Cancel option ${Subject} ${dataTables["name"]} (${dataTables["date"]})`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                axios({
                                    method: "POST",
                                    url: API + "/acc",
                                    data: {
                                        id: id,
                                        acc: false,
                                    },
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: `Bearer ${api_token}`,
                                        "X-CSRF-TOKEN": csrf_token,
                                    },
                                }).then((res) => {
                                    Toastr(res.data.response, res.data.message);
                                    if (res.data.response === "success") {
                                        $(`#DataTables`)
                                            .DataTable()
                                            .ajax.reload();
                                        if ("DataTables" !== idTable) {
                                            $(`#${idTable}`)
                                                .DataTable()
                                                .ajax.reload();
                                        }
                                    }
                                });
                            }
                        });
                    }

                    if (button === "trash") {
                        Swal.fire({
                            title: "Delete ?",
                            text: `Delete ${dataTables["name"]} (${dataTables["date"]}), Permanently deleted`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                axios({
                                    method: "POST",
                                    url: API + "/delete",
                                    data: {
                                        id: id,
                                    },
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: `Bearer ${api_token}`,
                                        "X-CSRF-TOKEN": csrf_token,
                                    },
                                }).then((res) => {
                                    Toastr(res.data.response, res.data.message);
                                    if (res.data.response === "success") {
                                        $(`#DataTables`)
                                            .DataTable()
                                            .ajax.reload();
                                        if ("DataTables" !== idTable) {
                                            $(`#${idTable}`)
                                                .DataTable()
                                                .ajax.reload();
                                        }
                                    }
                                });
                            }
                        });
                    }

                    if (button === "qr") {
                        var viewQR = "";
                        QRCode.toDataURL(
                            dataTables["code"],
                            function (err, url) {
                                viewQR = url;
                            }
                        );
                        Swal.fire({
                            title: "QR Code",
                            html: "<img class='w-full' src='" + viewQR + "'/>",
                        });
                    }
                });
            } catch (error) {
                Toastr("error", error.message);
            }
        }
    };

    if (datePickerReload) {
        $(`#${idTable}`).DataTable().destroy();
        $(`#${idTable}`).DataTable({
            processing: true,
            columns: columns,
            ajax: {
                async: true,
                url: `${API}/${urlTableAll}`,
                type: Method,
                data: function (d) {
                    d.Action = Action;
                    d.DataDateRange = DataDateRange;
                },
                datatype: "json",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${api_token}`,
                    "X-CSRF-TOKEN": csrf_token,
                },
            },
            aaSorting: [],
            language: {
                loadingRecords: "&nbsp;",
                // processing: '<div class="spinner"></div>',
                paginate: {
                    next: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
                    previous:
                        '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
                },
            },
            fnRowCallback: function (nRow, aData) {
                if (aData["active"] === "False") {
                    $(nRow).css("color", "red");
                }
            },
        });
    }

    useEffect(() => {
        handleAsync();
    }, []);

    return (
        <>
            <table
                id={idTable}
                className="display"
                style={{ minWidth: "845px", width: "100%" }}
            ></table>

            <Model
                idTable={idTable}
                header={modelHeader}
                modelData={modelData}
                subject={Subject}
                Api={API}
                setValidate={setValidate}
                setValidate2={setValidate2}
                csrf_token={csrf_token}
                api_token={api_token}
            />
        </>
    );
}
