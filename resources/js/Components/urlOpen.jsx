import { useEffect } from "react";

const urlOpen = (id) => {
    useEffect(() => {
        if (id === "Auth")
            if (
                localStorage.getItem("urlOpen") === "/" ||
                localStorage.getItem("urlOpen") === "/login" ||
                localStorage.getItem("urlOpen") === "/register" ||
                localStorage.getItem("urlOpen") === "/forgot-password" ||
                localStorage.getItem("urlOpen").startsWith("/reset-password")
            ) {
                window.location.reload();
            }

        if (id === "Guest") {
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
    }, []);
};

export default urlOpen;
