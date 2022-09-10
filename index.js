// initalize Express web application framework
const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const TodoTask = require("./models/TodoTask.js");

dotenv.config();

// 
app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));

//connection to db
mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");
    app.listen(3000, () => console.log("Server Up and running"));
});

// create a template engine that will convert our html file into something
// fun and interactive (this template engine is ejs but there are others)
app.set("view engine", "ejs");

// create some content that responds to a get request
// GET METHOD
app.get("/", (req, res) => {
  TodoTask.find({}, (err, tasks) => {
  res.render("todo.ejs", { todoTasks: tasks });
  });
  });

//POST METHOD
app.post('/',async (req, res) => {
  const todoTask = new TodoTask({
  content: req.body.content
  });
  try {
    await todoTask.save();
    res.redirect("/");
    } catch (err) {
      res.redirect("/");
      }
  });

//UPDATE
app
.route("/edit/:id")
  .get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
      res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    });
})
.post((req, res) => {
  const id = req.params.id;
  TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
  });
});

//DELETE
app.route("/remove/:id").get((req, res) => {
  const id = req.params.id;
  TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
  });
});



