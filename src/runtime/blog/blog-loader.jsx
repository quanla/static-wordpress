import React from "react";
import ReactDOM from "react-dom";
import {apiConfig} from "../api/api";
import {FetcherFactory} from "../../common/fetcher-factory";
import {CachedFetcher} from "../api/cached-fetcher";
import {AsyncUtil} from "../../common/utils/async-util";
import { renderRoutes } from 'react-router-config';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import {routes} from "./blog-routes";

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
        <BrowserRouter>
            {renderRoutes(routes)}
        </BrowserRouter>
    ), document.getElementById("app-container"));

});


