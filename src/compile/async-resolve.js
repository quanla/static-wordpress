const AsyncResolve = {
    asyncResolve({fn, getUnresolvedPromises}) {
        return new Promise((resolve, reject) => {
            const recurse = () => {
                let result = fn();

                let unresolvedPromises = getUnresolvedPromises();
                if (unresolvedPromises.length) {
                    Promise.all(unresolvedPromises).then(recurse);
                } else {
                    resolve(result);
                }
            };

            recurse();
        });
    }
};

exports.AsyncResolve = AsyncResolve;