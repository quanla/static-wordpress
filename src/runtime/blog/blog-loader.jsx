import {BlogApp} from "./blog-app";
import React from "react";
import ReactDOM from "react-dom";
import {apiConfig} from "../api/api";
import {FetcherFactory} from "../../common/fetcher-factory";
import {CachedFetcher} from "../api/cached-fetcher";
import {AsyncUtil} from "../../common/utils/async-util";

window.React = React;

let fetcher = FetcherFactory.createFetcher({});

let cachedGets = window.cached_gets;
delete window.cached_gets;

AsyncUtil.resolveToMap(cachedGets, fetcher.get).then((cachedGets) => {

    apiConfig.setFetcher(CachedFetcher.createCachedFetcher(
        fetcher,
        cachedGets
    ));

    ReactDOM.hydrate((
        <BlogApp/>
    ), document.getElementById("app-container"));

});


