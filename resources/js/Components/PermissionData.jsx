import React, { useState, useRef, useEffect } from "react";

import Toastr from "@/Components/Toastr";

const PermissionData = (urlopen, permission, groups, namePage) => {
    const permissionCek = (tipe) => {
        if (tipe === "view") {
            if (
                permission.includes(
                    `view${namePage
                        .toLowerCase()
                        .replace(" ", "_")
                        .replace(" ", "_")}`
                )
            ) {
                return true;
            } else {
                return false;
            }
        } else if (tipe === "update") {
            if (
                permission.includes(
                    `update${namePage
                        .toLowerCase()
                        .replace(" ", "_")
                        .replace(" ", "_")}`
                )
            ) {
                return true;
            } else {
                return false;
            }
        } else if (tipe === "delete") {
            if (
                permission.includes(
                    `delete${namePage
                        .toLowerCase()
                        .replace(" ", "_")
                        .replace(" ", "_")}`
                )
            ) {
                return true;
            } else {
                return false;
            }
        } else if (tipe === "create") {
            if (
                permission.includes(
                    `create${namePage
                        .toLowerCase()
                        .replace(" ", "_")
                        .replace(" ", "_")}`
                )
            ) {
                return true;
            } else {
                return false;
            }
        }
    };

    const dataAction = () => {
        var actionData = [];
        if (permissionCek("update")) {
            actionData.push("Update");
        }

        if (permissionCek("delete")) {
            actionData.push("Delete");
        }
        return actionData;
    };

    if (!permissionCek("view")) {
        if (namePage !== "Dashboard") {
            Toastr("error", "You don't have permission");
            setTimeout(() => {
                window.location.replace("/dashboard");
            }, 2000);
        }
    }

    useEffect(() => {
        if (urlopen === "Auth")
            if (
                localStorage.getItem("urlOpen") === "/" ||
                localStorage.getItem("urlOpen") === "/login" ||
                localStorage.getItem("urlOpen") === "/register" ||
                localStorage.getItem("urlOpen") === "/forgot-password" ||
                localStorage.getItem("urlOpen").startsWith("/reset-password")
            ) {
                window.location.reload();
            }

        if (urlopen === "Guest") {
            if (
                localStorage.getItem("urlOpen") === "/" ||
                localStorage.getItem("urlOpen") === "/login" ||
                localStorage.getItem("urlOpen") === "/register" ||
                localStorage.getItem("urlOpen") === "/forgot-password" ||
                localStorage.getItem("urlOpen") === "/verify-email" ||
                localStorage.getItem("urlOpen").startsWith("/reset-password")
            ) {
            } else {
                window.location.reload();
            }
        }

        $("#quota").show();

        // console.log($("#quota font").html());
    }, []);

    return {
        managePerm: [...dataAction(), groups],
        view: permissionCek("view"),
        create: permissionCek("create"),
        update: permissionCek("update"),
        delete: permissionCek("delete"),
    };
};

export default PermissionData;
