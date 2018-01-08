
function instantResolve(value) {
    return {
        then: (fn) => {
            fn(value);
        }
    };
}

const Cacher = {
    createCacher(fn) {

        let cache = {};
        let unresolvedPromises = [];

        return {
            execute: (key) => {
                if (cache.hasOwnProperty(key)) {
                    return instantResolve(cache[key]);
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
        };
    }
};

exports.Cacher = Cacher;