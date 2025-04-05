const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// get all todos
router.get("/", async (req, res) => {});

// get todo by id
router.get("/:id", async (req, res) => {});

// create todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(200).json({
      message: "Todo Created Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// create multiple todos
router.post("/all", async (req, res) => {
  try {
    const todos = req.body;
    await Todo.insertMany(todos);

    res.status(200).json({
      message: "Multiple Todos Created Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to create todos",
    });
  }
});

// update todo by id
router.put("/:id", async (req, res) => {});

// delete todo by id
router.delete("/:id", async (req, res) => {});

module.exports = router;
