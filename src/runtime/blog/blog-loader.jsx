import {BlogApp} from "./blog-app";
import React from "react";
import ReactDOM from "react-dom";
import {apiConfig} from "../api/api";
import {FetcherFactory} from "../../common/fetcher-factory";
import {CachedFetcher} from "../api/cached-fetcher";

window.React = React;

apiConfig.setFetcher(CachedFetcher.createCachedFetcher(
    FetcherFactory.createFetcher({}),
    window.cached_api
));

delete window.cached_api;

ReactDOM.hydrate((
    <BlogApp/>
), document.getElementById("app-container"));
