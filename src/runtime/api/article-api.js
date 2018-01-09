const AsyncUtil = require("../../common/utils/async-util").AsyncUtil;
const fetcher = require("./api").fetcher;
const articleApi = {
    getArticle(path) {

        return AsyncUtil.all([
            fetcher.get(`/${path}/content.md`),
            fetcher.get(`/${path}/manifest.json`),
        ])
            .then(([content, manifest]) => ({
                ... manifest,
                content,
            }))
        ;
    },
};

exports.articleApi = articleApi;