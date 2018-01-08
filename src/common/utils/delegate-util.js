function delegate(get, fns) {
    let ret = {};
    fns.forEach((fName) => {
        ret[fName] = (...args) => get()[fName].apply(null, args);
    });
    return ret;
}

const DelegateUtil = {
    delegate,
};

exports.DelegateUtil = DelegateUtil;