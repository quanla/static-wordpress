const fetcher = require("./api").fetcher;
const authorApi = {
    getAuthor(id) {
        return fetcher.get(`/author/${id}/manifest.json`);
    },
    getArticles(id) {
        return fetcher.get(`/author/${id}/articles.json`);
    },
};

exports.authorApi = authorApi;