const AsyncUtil = require("../../common/utils/async-util").AsyncUtil;
const fetcher = require("./api").fetcher;
const articleApi = {
    getArticle(path) {

        return AsyncUtil.all([
            fetcher.get(`/article/${path}/content.mdx`),
            fetcher.get(`/article/${path}/manifest.json`),
        ])
            .then(([content, manifest]) => ({
                ... manifest,
                content,
            }))
        ;
    },
    getArticleManifest(code) {
        return fetcher.get(`/article/${code}/manifest.json`);
    },
    getAllArticles() {
        return fetcher.get(`/articles.json`);
    },
};

exports.articleApi = articleApi;