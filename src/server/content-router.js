
function createContentRouter(createResolveContent) {

    return async (req, res, next) => {
        let reqUrl = req.url;

        // console.log(reqUrl);

        let content = await createResolveContent(reqUrl);
        if (content != null) {
            if (reqUrl.endsWith("/") || reqUrl.endsWith(".html")) {
                res.set('Content-Type', 'text/html');
            } else if (reqUrl.endsWith(".json")) {
                res.set('Content-Type', 'application/json');
            } else if (reqUrl.endsWith(".jpg")) {
                res.set('Content-Type', 'image/jpg');
            }
            res.send(content);
        } else {
            next();
        }
    };

}

exports.createContentRouter = createContentRouter;