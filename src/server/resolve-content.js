function createResolveContent(...contentGenerators) {
    return async (url) => {
        for (let i = 0; i < contentGenerators.length; i++) {
            let contentGenerator = contentGenerators[i];

            let contents = await contentGenerator();
            for (let i = 0; i < contents.length; i++) {
                let contentHolder = contents[i];
                // console.log(contentHolder);
                let {path, createContent} = contentHolder;
                if (url == path || url + "index.html" == path) {
                    return createContent();
                }
            }
        }
    };
}

exports.createResolveContent = createResolveContent;