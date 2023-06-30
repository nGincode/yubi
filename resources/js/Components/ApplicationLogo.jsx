import React from "react";

export default function ApplicationLogo({ className, width }) {
    return (
        <img
            src="/assets/logo/yubi.png"
            alt=""
            width={width}
            className={className}
        />
    );
}
