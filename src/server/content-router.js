const resolveContent = require("./resolve-content").resolveContent;

function createContentRouter(contentGenerator) {

    return async (req, res, next) => {
        let reqUrl = req.url;

        let content = await resolveContent(reqUrl, contentGenerator);
        if (content != null) {
            if (reqUrl.endsWith("/") || reqUrl.endsWith(".html")) {
                res.set('Content-Type', 'text/html');
            } else if (path.endsWith(".json")) {
                res.set('Content-Type', 'application/json');
            }
            res.send(content);
        } else {
            next();
        }
    };

}

exports.createContentRouter = createContentRouter;