// initalize Express web application framework
const express = require("express");
const app = express();
const port = 3000

// 
app.use("/static", express.static("public"));

// create a template engine that will convert our html file into something
// fun and interactive (this template engine is ejs but there are others)
app.set("view engine", "ejs");

// create some content that responds to a get request
app.get("/", (req, res) => {
    res.render("todo.ejs");
});

// create a server and listen on port 3000 for connections
app.listen(port, () => console.log("Server Up and running"));

