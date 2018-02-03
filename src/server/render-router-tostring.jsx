
import {renderToString} from "react-dom/server";
import StaticRouter from 'react-router-dom/StaticRouter';
import {renderRoutes} from 'react-router-config';

const renderRouterToString = (url, routes) => (
    renderToString(
        <StaticRouter location={url} context={{}}>
            {renderRoutes(routes)}
        </StaticRouter>
    )
);

exports.renderRouterToString = renderRouterToString;