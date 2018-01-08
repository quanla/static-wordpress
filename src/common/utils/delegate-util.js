function delegate(get, fns) {
    let ret = {};
    fns.forEach((fName) => {
        ret[fName] = (...args) => {
            let runtimeObj = get();
            return runtimeObj[fName].apply(null, args);
        };
    });
    return ret;
}

const DelegateUtil = {
    delegate,
};

exports.DelegateUtil = DelegateUtil;