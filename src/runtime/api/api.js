const DelegateUtil = require("../../common/utils/delegate-util").DelegateUtil;

let apiImpl;

const apiConfig = {
    setApiImpl: (_apiImpl) => apiImpl = _apiImpl,
};

exports.apiConfig = apiConfig;

const api = DelegateUtil.delegate(() => apiImpl, ["get", "put", "post", "delete"]);

exports.api = api;