import React from "react";

export default function Button({
    type = "submit",
    className = "",
    processing,
    children,
    active,
}) {
    return (
        <button
            type={type}
            className={className}
            disabled={processing || active}
        >
            {processing ? (
                <div className="spinner-border" role="status"></div>
            ) : (
                children
            )}
        </button>
    );
}
