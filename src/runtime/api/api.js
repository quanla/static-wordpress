const DelegateUtil = require("../../common/utils/delegate-util").DelegateUtil;

let fetcher;

const apiConfig = {
    setFetcher: (_fetcher) => fetcher = _fetcher,
};

exports.apiConfig = apiConfig;

exports.fetcher = DelegateUtil.delegate(() => fetcher, ["get", "put", "post", "delete"]);