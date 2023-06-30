import { useEffect, useState } from "react";

const ImgUpload = ({ name, src, id, empty }) => {
    const [profileImg, setprofileImg] = useState();
    const [srcDelete, setsrcDelete] = useState(false);

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setprofileImg(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const closeImageHandler = (e) => {
        setprofileImg(null);
        $("#" + id).val("");
    };

    const deleteImageHandler = (e) => {
        setsrcDelete(true);
    };

    return (
        <>
            <div className="mb-3 col-md-12">
                <div className="form-group">
                    <div
                        style={{
                            margin: "auto",
                            width: "150px",
                            height: "150px",
                            borderRadius: "5px",
                            marginTop: "1rem",
                        }}
                    >
                        {profileImg ? (
                            <>
                                <div
                                    style={{
                                        background: "white",
                                        position: "absolute",
                                        marginLeft: "135px",
                                        marginTop: "-6px",
                                        color: "red",
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        width: "25px",
                                        height: "25px",
                                        padding: "2px 7px",
                                    }}
                                    onClick={closeImageHandler}
                                    id="closeImg"
                                >
                                    <i className="fa fa-times"></i>
                                </div>
                                <img
                                    src={profileImg}
                                    alt=""
                                    style={{
                                        width: "150px",
                                        height: "145px",
                                        objectFit: "cover",
                                        borderRadius: "5px",
                                    }}
                                />
                            </>
                        ) : (
                            <>
                                {src ? (
                                    <>
                                        {!srcDelete ? (
                                            <>
                                                <div
                                                    style={{
                                                        background: "white",
                                                        position: "absolute",
                                                        marginLeft: "135px",
                                                        marginTop: "-6px",
                                                        color: "red",
                                                        cursor: "pointer",
                                                        borderRadius: "50%",
                                                        width: "25px",
                                                        height: "25px",
                                                        padding: "2px 7px",
                                                    }}
                                                    onClick={deleteImageHandler}
                                                    id="deleteImg"
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </div>
                                                <img
                                                    src={src}
                                                    alt=""
                                                    style={{
                                                        width: "150px",
                                                        height: "145px",
                                                        objectFit: "cover",
                                                        borderRadius: "5px",
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <div
                                                    style={{
                                                        width: "150px",
                                                        height: "145px",
                                                        objectFit: "cover",
                                                        background:
                                                            "rgb(221, 221, 221)",
                                                        borderRadius: "5px",
                                                        display: "table-cell",
                                                        verticalAlign: "middle",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Save to delete image
                                                </div>
                                                <input
                                                    type="hidden"
                                                    name="imgDel"
                                                    value="1"
                                                />
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {empty ? (
                                            <div
                                                style={{
                                                    width: "150px",
                                                    height: "145px",
                                                    objectFit: "cover",
                                                    background:
                                                        "rgb(221, 221, 221)",
                                                    borderRadius: "5px",
                                                    display: "table-cell",
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: "#fff",
                                                        fontSize: "xxx-large",
                                                        fontWeight: "bolder",
                                                    }}
                                                >
                                                    {empty.substring(0, 2)}
                                                </span>
                                            </div>
                                        ) : (
                                            <div
                                                style={{
                                                    width: "150px",
                                                    height: "145px",
                                                    objectFit: "cover",
                                                    background:
                                                        "rgb(221, 221, 221)",
                                                    borderRadius: "5px",
                                                }}
                                            ></div>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        name={name}
                        id={id}
                        onChange={imageHandler}
                        style={{ display: "none" }}
                    />
                    <div
                        style={{
                            width: "100%",
                            marginTop: "-1rem",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <label
                            htmlFor={id}
                            style={{
                                cursor: "pointer",
                            }}
                            className="badge badge-primary"
                        >
                            Choose your image
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImgUpload;
