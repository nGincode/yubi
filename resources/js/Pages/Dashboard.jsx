import React, { useState, useRef, useEffect, Component } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

import "chart.js/auto";

import { MdWavingHand } from "react-icons/md";

import PermissionData from "@/Components/PermissionData";
import Skeleton from "@/Components/Skeleton";

export default function Dashboard(props) {
    const namePage = "Dashboard";
    const permission = PermissionData(
        "Auth",
        props.permission,
        props.groups?.groups.data,
        namePage
    );

    //useState
    const [dataResScan, setdataResScan] = useState();
    const [dataScan, setdataScan] = useState();

    //input
    const handleAsync = async (tipe, req) => {};

    //useEffect
    useEffect(() => {
        $("#main-wrapper").removeClass("menu-toggle");
        $(".hamburger ").removeClass("is-active");
    }, []);

    return (
        <>
            <Head title={namePage} />
            <Skeleton />

            <div id="content">
                <div className="row invoice-card-row">
                    <div className="col-xl-12">
                        <div
                            className={
                                props.storeActive === "True" &&
                                props.contactActive === "True" &&
                                props.groups
                                    ? "card coin-card"
                                    : "card bg-danger "
                            }
                        >
                            <div className="card-body d-sm-flex d-block align-items-center">
                                <span className="coin-icon">
                                    <MdWavingHand
                                        size={70}
                                        className="text-white"
                                    />
                                </span>
                                <div>
                                    <h3 className="text-white">
                                        Haii..!! {props.auth.user.username}
                                    </h3>
                                    {props.contact && props.groups ? (
                                        <p className="text-white">
                                            Selamat Datang {props.contact.name}
                                            <br /> Anda Bergabung Dalam Divisi{" "}
                                            {
                                                props.contact.division
                                            } Sebagai{" "}
                                            <b>{props.contact.position}</b>{" "}
                                            <br />
                                            <b>
                                                {props.storeActive === "False"
                                                    ? "Namun store " +
                                                      props.contact.store.name +
                                                      " tidak aktif beroprasi lagi"
                                                    : props.contactActive ===
                                                      "False"
                                                    ? "Namun anda telah resign"
                                                    : ""}
                                            </b>
                                        </p>
                                    ) : (
                                        <p className="text-white ml-3">
                                            Anda telah berhasil login, Anda
                                            sedang divaliadasi oleh pihak admin.
                                            <br />
                                            {props.contact ? (
                                                <>Name : {props.contact.name}</>
                                            ) : (
                                                <>
                                                    {props.groups && (
                                                        <>
                                                            {
                                                                "! Contact tidak terhubung, Silahkan lengkapi data contact di Accounts->Contact"
                                                            }{" "}
                                                            <br />
                                                        </>
                                                    )}
                                                </>
                                            )}
                                            {props.groups
                                                ? ""
                                                : "!! Izin akses belum dimiliki"}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
