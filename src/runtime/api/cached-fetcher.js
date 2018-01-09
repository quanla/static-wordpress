const AsyncUtil = require("../../common/utils/async-util").AsyncUtil;

const CachedFetcher = {
    createCachedFetcher(fetcher, cache) {
        return {
            ...fetcher,
            get: (url, ...params) => {
                if (cache.hasOwnProperty(url)) {
                    return AsyncUtil.instantResolve(cache[url]);
                } else {
                    return fetcher.get.call(null, url, ...params);
                }
            }
        };
    }
};

exports.CachedFetcher = CachedFetcher;