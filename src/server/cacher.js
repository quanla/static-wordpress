const AsyncUtil = require("../common/utils/async-util").AsyncUtil;

const Cacher = {
    createCacher(fn) {

        let cache = {};
        let unresolvedPromises = [];

        return {
            execute: (key) => {
                if (cache.hasOwnProperty(key)) {
                    return AsyncUtil.instantResolve(cache[key]);
                } else {
                    let promise = fn(key);
                    unresolvedPromises = unresolvedPromises.concat([promise]);
                    promise.then((result) => {
                        cache[key] = result;
                        unresolvedPromises = unresolvedPromises.filter((p) => p !== promise);
                        return result;
                    });
                    return promise;
                }

            },
            getUnresolvedPromises: () => unresolvedPromises,
            getCache: () => cache,
        };
    }
};

exports.Cacher = Cacher;