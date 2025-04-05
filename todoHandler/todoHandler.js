const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// get all todos
// router.get("/", async (req, res) => {
//   try {
//     const todos = await Todo.find();
//     res.status(200).json({
//       message: "Todos fetched successfully",
//       todos: todos,
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: "Failed to fetch todos",
//     });
//   }
// });

// get all todos with filter
// router.get("/", async (req, res) => {
//   try {
//     const todos = await Todo.find({ status: "active" });
//     res.status(200).json({
//       message: "Todos fetched successfully",
//       todos: todos,
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: "Failed to fetch todos",
//     });
//   }
// });

// get all todos with selected fields and limit
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find()
      .select({
        _id: 0,
        createdAt: 0,
        __v: 0,
      })
      .limit(2);
    res.status(200).json({
      message: "Todos fetched successfully",
      todos: todos,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch todos",
    });
  }
});

// get todo by id
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.find({ _id: req.params.id });
    res.status(200).json({
      message: "Todo fetched successfully",
      todos: todo,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch todo",
    });
  }
});

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
// router.put("/:id", async (req, res) => {
//   try {
//     const result = await Todo.updateOne(
//       { _id: req.params.id },
//       {
//         $set: {
//           status: "active",
//         },
//       }
//     );

//     if (result.modifiedCount === 0) {
//       console.log(result);
//       return res.status(404).json({
//         message: "Todo not found or already updated",
//       });
//     }

//     res.status(200).json({
//       message: "Todo updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: "Failed to update todo",
//     });
//   }
// });

router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: { status: "active" } },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    console.log(updatedTodo);

    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to update todo",
    });
  }
});

// delete todo by id
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Todo deleted successfully",
      todos: todo,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete todo",
    });
  }
});

module.exports = router;
