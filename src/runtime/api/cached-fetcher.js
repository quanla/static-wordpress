function instantResolve(value) {
    return {
        then: (fn) => {
            fn(value);
        }
    };
}

const CachedFetcher = {
    createCachedFetcher(fetcher, cache) {
        return {
            ...fetcher,
            get: (url, ...params) => {
                if (cache.hasOwnProperty(url)) {
                    return instantResolve(cache[url]);
                } else {
                    return fetcher.get.call(null, url, ...params);
                }
            }
        };
    }
};

exports.CachedFetcher = CachedFetcher;