
function instantResolve(value) {
    return {
        then: (fn) => {
            return instantResolve(fn(value));
        }
    };
}

function resolveToMap(keys, fn) {
    return Promise.all(keys.map(fn)).then((list) => {
        let ret = {};
        for (let i = 0; i < list.length; i++) {
            ret[keys[i]] = list[i];
        }
        return ret;
    });
}

function all(promises) {
    let ret = [];
    let count = 0;
    promises.forEach((p, i) => p.then((result) => {
        count++;
        return ret[i] = result;
    }));
    if (count === promises.length) {
        return instantResolve(ret);
    }
    return Promise.all(promises);
}

const AsyncUtil = {
    resolveToMap,
    all,
    instantResolve,
};

exports.AsyncUtil = AsyncUtil;