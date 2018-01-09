const express = require("express");

let app = express();

app.use(express.static("dist/deploy"));

app.listen(2312, () => {
    console.log(2312);
});
