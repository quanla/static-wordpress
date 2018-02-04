function getLoadedSrcList() {
    return Object.keys(require.cache).filter((key) =>
        key.indexOf("/node_modules/") == -1
    );
}
function clearSrcCache() {
    getLoadedSrcList().forEach((key) =>
        delete require.cache[key]
    );
}

const NodeUtil = {
    getLoadedSrcList,
    clearSrcCache,
};

exports.NodeUtil = NodeUtil;