function resolveToMap(keys, fn) {
    return Promise.all(keys.map(fn)).then((list) => {
        let ret = {};
        for (let i = 0; i < list.length; i++) {
            ret[keys[i]] = list[i];
        }
        return ret;
    });
}

const AsyncUtil = {
    resolveToMap,
};

exports.AsyncUtil = AsyncUtil;