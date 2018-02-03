
const {renderToString} = require("react-dom/server");
const StaticRouter = require('react-router-dom/StaticRouter');
const {renderRoutes} = require('react-router-config');

const renderRouterToString = (url, routes) => (
    renderToString(
        <StaticRouter location={url} context={{}}>
            {renderRoutes(routes)}
        </StaticRouter>
    )
);

exports.renderRouterToString = renderRouterToString;