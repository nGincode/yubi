import React from "react";
import { Detector } from "react-detect-offline";

export default function CheckConnection() {
    return (
        <>
            <Detector
                polling={{
                    url: "https://ipv4.icanhazip.com",
                    interval: 5000,
                    timeout: 5000,
                }}
                render={({ online }) => (
                    <>
                        {online ? (
                            <div className="fixed top-3 right-3 z-50">
                                <div className="rounded-full bg-green-500 w-3 h-3"></div>
                            </div>
                        ) : (
                            <div className=" fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                                <div className="flex justify-center items-center">
                                    <div
                                        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                </div>
                                <h2 className="text-centertext-xl font-semibold mt-3 text-white-50">
                                    No Internet Connection
                                </h2>
                            </div>
                        )}
                    </>
                )}
            />
        </>
    );
}
