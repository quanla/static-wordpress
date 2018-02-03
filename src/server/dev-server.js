const express = require("express");
const createContentRouter = require("./content-router").createContentRouter;
const createContentGenerator = require("./content-generator").createContentGenerator;


let app = express();

app.use(express.static("dist"));

app.use(createContentRouter(createContentGenerator(`${__dirname}/../../sample`)));

app.listen(2312, () => {
    console.log(`Dev server started at port ${2312}`);
});
