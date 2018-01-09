const fetcher = require("./api").fetcher;
const articleApi = {
    getArticle(path) {
        return Promise.all([
            fetcher.get(`/${path}/content.md`),
            fetcher.get(`/${path}/manifest.json`),
        ])
            .then(([content, manifest]) => ({
                title: manifest.title,
                content,
            }))
        ;
    },
};

exports.articleApi = articleApi;