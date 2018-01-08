const fetcher = require("./api").fetcher;
const articleApi = {
    getArticleContent(path) {
        return fetcher.get(`${path}/content.md`);
    },
};

exports.articleApi = articleApi;