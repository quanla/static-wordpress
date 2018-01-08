const api = require("./api").api;
const articleApi = {
    getArticleContent(path) {
        return api.get(path);
    },
};

exports.articleApi = articleApi;