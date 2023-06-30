import "../css/app.css";
import _ from "lodash";
import axios from "axios";

window._ = _;

window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

import Authenticated from "@/Layouts/Authenticated";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const urlToString = () => {
            var query = props.initialPage.url;
            var queryLength = props.initialPage.url.indexOf("?");
            if (queryLength > 0) {
                return query.substr(0, queryLength);
            } else {
                return query;
            }
        };

        localStorage.setItem("urlOpen", urlToString());

        if (
            props.initialPage.url === "/" ||
            props.initialPage.url === "/login" ||
            props.initialPage.url === "/register" ||
            props.initialPage.url === "/forgot-password" ||
            props.initialPage.url === "/verify-email" ||
            props.initialPage.url.startsWith("/reset-password")
        ) {
            return render(<App {...props} />, el);
        } else {
            return render(
                <Authenticated
                    auth={props.initialPage.props.auth}
                    permission={props.initialPage.props.permission}
                    quota={props.initialPage.props.quotaRp}
                    contacts={props.initialPage.props.contact}
                    selectStore={props.initialPage.props.selectStore}
                >
                    <App {...props} />
                </Authenticated>,
                el
            );
        }
    },
});

InertiaProgress.init({ color: "#4B5563" });
