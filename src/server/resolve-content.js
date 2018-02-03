async function resolveContent(url, contentGenerator) {
    let allContent = await contentGenerator();
    for (let i = 0; i < allContent.length; i++) {
        let {path, createContent} = allContent[i];
        if (url == path || url + "index.html" == path) {
            return createContent();
        }
    }
}

exports.resolveContent = resolveContent;