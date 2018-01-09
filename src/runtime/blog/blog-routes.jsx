import {ArticleRoute} from "./routes/article/article-route";
import {AuthorRoute} from "./routes/author/author-route";

const routes = [
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