const fetcher = require("./api").fetcher;
const authorApi = {
    getAuthor(id) {
        return fetcher.get(`/author/${id}/manifest.json`);
    },
};

exports.authorApi = authorApi;