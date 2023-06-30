import React, { useEffect, useRef, useState } from "react";

import numeral from "numeral";

export default function Input({
    type = "text",
    id,
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    pleaceholder,
    maxLength = null,
    isChecked,
    rememberme,
    rupiah,
    defaultValue,
    read,
    unit,
    rupiahnocss,
}) {
    const input = useRef();
    const inputShow = useRef();

    const [val, setval] = useState();
    const [valShow, setvalShow] = useState();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
        if (isChecked) {
            input.current.select;
        }
    }, []);

    const handleChangeValue = (e) => {
        if (e.target.value.length == 27) {
            setval(0);
            setvalShow(0);
            return;
        }

        setval(numeral(e.target.value).format("0"));
        setvalShow(numeral(e.target.value).format("0,0"));
    };

    return (
        <>
            {rupiah ? (
                <>
                    {rupiahnocss ? (
                        <>
                            {read ? (
                                <>
                                    <input
                                        type="text"
                                        value={numeral(defaultValue).format(
                                            "0,0"
                                        )}
                                        className={className}
                                        readOnly
                                        style={{
                                            textAlign: "right",
                                            cursor: "help",
                                        }}
                                    />
                                    <input
                                        type="hidden"
                                        value={numeral(defaultValue).format(
                                            "0"
                                        )}
                                        name={name}
                                        className={className}
                                        readOnly
                                        style={{
                                            textAlign: "right",
                                            cursor: "help",
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <input
                                        type={type}
                                        value={
                                            valShow ??
                                            numeral(defaultValue).format("0,0")
                                        }
                                        id={name.replace("[]", "") + "_rupiah"}
                                        className={className}
                                        autoComplete={autoComplete}
                                        required={required}
                                        onChange={(e) => handleChangeValue(e)}
                                        placeholder="0"
                                        maxLength={maxLength}
                                        style={{ textAlign: "right" }}
                                    />
                                    <input
                                        type="hidden"
                                        name={name}
                                        value={val ?? defaultValue + ""}
                                        className={className}
                                        autoComplete={autoComplete}
                                        required={required}
                                        placeholder={pleaceholder}
                                        maxLength={maxLength}
                                        onChange={() => {}}
                                    />
                                </>
                            )}{" "}
                        </>
                    ) : (
                        <>
                            <div className="flex items-start">
                                {read ? (
                                    <div className="input-group mb-1  input-success">
                                        <span className="input-group-text">
                                            Rp.
                                        </span>
                                        <input
                                            type="text"
                                            value={numeral(defaultValue).format(
                                                "0,0"
                                            )}
                                            className={className}
                                            readOnly
                                            style={{
                                                textAlign: "right",
                                                cursor: "help",
                                            }}
                                        />
                                        <input
                                            type="hidden"
                                            value={numeral(defaultValue).format(
                                                "0"
                                            )}
                                            name={name}
                                            className={className}
                                            readOnly
                                            style={{
                                                textAlign: "right",
                                                cursor: "help",
                                            }}
                                        />
                                        <span className="input-group-text">
                                            {unit ? "/" + unit : ".00"}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="input-group mb-1  input-success">
                                        <span className="input-group-text">
                                            Rp.
                                        </span>
                                        <input
                                            type={type}
                                            value={
                                                valShow ??
                                                numeral(defaultValue).format(
                                                    "0,0"
                                                )
                                            }
                                            id={
                                                name.replace("[]", "") +
                                                "_rupiah"
                                            }
                                            className={className}
                                            autoComplete={autoComplete}
                                            required={required}
                                            onChange={(e) =>
                                                handleChangeValue(e)
                                            }
                                            placeholder="0"
                                            maxLength={maxLength}
                                            style={{ textAlign: "right" }}
                                        />
                                        <input
                                            type="hidden"
                                            name={name}
                                            value={val ?? defaultValue + ""}
                                            className={className}
                                            autoComplete={autoComplete}
                                            required={required}
                                            placeholder={pleaceholder}
                                            maxLength={maxLength}
                                            onChange={() => {}}
                                        />
                                        <span className="input-group-text">
                                            {unit ? "/" + unit : ".00"}
                                        </span>
                                    </div>
                                )}{" "}
                            </div>
                        </>
                    )}
                </>
            ) : unit ? (
                <div className="input-group mb-1  input-success">
                    <input
                        type={type}
                        name={name}
                        defaultValue={defaultValue}
                        className={className}
                        style={{
                            textAlign: "right",
                        }}
                        required={required}
                    />
                    <span className="input-group-text">{unit}</span>
                </div>
            ) : (
                <div className="flex items-start">
                    <input
                        id={id}
                        type={type}
                        name={name}
                        value={value}
                        className={className}
                        ref={input}
                        autoComplete={autoComplete}
                        required={required}
                        onChange={(e) => handleChange(e)}
                        placeholder={pleaceholder}
                        maxLength={maxLength}
                    />
                    {rememberme && (
                        <label className="mt-1 ml-1">Remember Me</label>
                    )}
                </div>
            )}
        </>
    );
}
