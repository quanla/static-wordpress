const O = require("./utils/object-util").O;
const FetcherFactory = {
    createFetcher({urlModifier = (url) => url, getHeaders}) {
        let createHeaders = () => {
            let headers = new Headers();
            getHeaders && O.forEach(getHeaders(), (value, key) =>
                headers.append(key, value)
            );
            return headers;
        };

        const withPayload = (method) => (url, data) => {
            let headers = createHeaders();
            headers.append("Content-Type", "application/json");
            return fetch(urlModifier(url), {
                method,
                body: data == null ? undefined : JSON.stringify(data),
                headers,
            }).then((response) => response.json());
        };
        const withoutPayload = (method) => (url) => {
            let headers = createHeaders();
            return fetch(urlModifier(url), {
                method,
                headers
            }).then((response) => {
                let contentType = response.headers.get("content-type").replace(/; charset=.*/,"");
                return contentType === "application/json" ? response.json() : response.text();
            });
        };

        return {
            get: withoutPayload("GET"),
            delete: withoutPayload("DELETE"),
            post: withPayload("POST"),
            put: withPayload("PUT"),
        };
    }
};

exports.FetcherFactory = FetcherFactory;