const api = require("./api").api;
const articleApi = {
    getArticleContent(path) {
        return api.get(`${path}/content.md`);
    },
};

exports.articleApi = articleApi;