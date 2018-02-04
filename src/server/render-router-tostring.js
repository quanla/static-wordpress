const React = require("react");

const {renderToString} = require("react-dom/server");
const StaticRouter = require('react-router-dom/StaticRouter').default;
const {renderRoutes} = require('react-router-config');

const renderRouterToString = (url, routes) => (
    renderToString(
        React.createElement(StaticRouter, {location: url, context: {}}, renderRoutes(routes))
    )
);

exports.renderRouterToString = renderRouterToString;