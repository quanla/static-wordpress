import {ArticleRoute} from "./article-route";

const routes = [
    {
        path: '/article/:slug',
        component: ArticleRoute,
    },
];

exports.routes = routes;