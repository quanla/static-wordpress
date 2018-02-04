import {ArticleRoute} from "./routes/article/article-route";
import {AuthorRoute} from "./routes/author/author-route";
import {IndexRoute} from "./routes/index/index-route";

const routes = [
    {
        path: '/',
        exact: true,
        component: IndexRoute,
    },
    {
        path: '/article/:slug/',
        component: ArticleRoute,
    },
    {
        path: '/author/:id/',
        component: AuthorRoute,
    },
];

exports.routes = routes;