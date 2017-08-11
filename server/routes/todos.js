const express = require("express");
const router = express.Router();

const models = require("../models");


router.get("/", (req, res) => {
  models.todo.findAll().then(todos => {
    res.render("todos/index", { todos: todos });
  });
});

router.get("/:id/edit", (req, res) => {
  models.todo.findById(req.params.id).then(todo => {
    res.render("todos/edit", {todo: todo})
  })
});

router.get("/:id", (req, res) => {
  models.todo.findById(req.params.id).then(todo => {
    res.render("todos/show", { todo: todo });
  });
});

router.post("/:id/editing", (req, res) => {
  models.todo.findById(req.params.id).then(todo => {
    todo.update({
      description: req.body.edited
    }).then(() => {
      res.redirect("/todos");
    })
  })
});

router.post("/done", (req, res) => {
  models.todo.findById(req.body.button).then(todo => {
    console.log(req.body);
    if (req.body.button) {
      todo.update({
        completed: true
      }).then(() => {
        res.redirect("/todos");
      })
    } else {
      res.redirect(`/todos/${req.body.edit}/edit`)
    }
  })
});

router.post("/add", (req, res) => {
  models.todo.create({
    description: req.body.toDoItem,
    completed: false
  }).then(() => {
    res.redirect("/todos");
  })
});

router.post("/delete", (req, res) => {
  models.todo.findById(req.body.button).then(todo => {
    todo.destroy()
    .then(() => {
      res.redirect("/todos");
    })
  });
});

module.exports = router;
