import {BlogApp} from "./blog-app";
import React from "react";
import ReactDOM from "react-dom";
import {apiConfig} from "../api/api";

window.React = React;

apiConfig.setApiImpl({});

ReactDOM.render((
    <BlogApp/>
), document.getElementById("app-container"));
