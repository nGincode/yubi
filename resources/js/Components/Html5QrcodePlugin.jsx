// file = Html5QrcodePlugin.jsx
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const qrcodeRegionId = "qr-reader";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {
    let config = {};
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    if (props.videoConstraints) {
        config.videoConstraints = props.videoConstraints;
    }
    return config;
};

const Html5QrcodePlugin = (props) => {
    useEffect(() => {
        // when component mounts
        const config = createConfig(props);
        const verbose = props.verbose === true;
        // Suceess callback is required.
        if (!props.qrCodeSuccessCallback) {
            throw "qrCodeSuccessCallback is required callback.";
        }
        const html5QrcodeScanner = new Html5QrcodeScanner(
            qrcodeRegionId,
            config,
            verbose
        );
        html5QrcodeScanner.render(
            props.qrCodeSuccessCallback,
            props.qrCodeErrorCallback
        );

        $("#qr-reader img").hide();
        $("#qr-reader").css({
            "border-radius": "40px",
        });
        $("#qr-reader__header_message")
            .addClass("mt-3 bg-transparent")
            .css("border-top", "unset");
        $("#html5-qrcode-anchor-scan-type-change")
            .addClass("btn btn-primary")
            .css("text-decoration", "unset");
        $("#html5-qrcode-button-camera-permission")
            .addClass("btn btn-warning")
            .addClass("mb-2");
        $("#html5-qrcode-button-camera-stop")
            .addClass("btn btn-danger")
            .addClass("mb-2");
        $("#html5-qrcode-button-camera-start")
            .addClass("btn btn-success")
            .addClass("mb-2");

        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch((error) => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);

    return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
