const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model("Todo", todoSchema);

// get all todos
router.get("/", async(req, res) => {

})

// get todo by id
router.get("/:id", async(req, res) => {

})

// create todo
router.post("/", async(req, res) => {

})

// create multiple todos
router.post("/all", async(req, res) => {

})

// update todo by id
router.put("/:id", async(req, res) => {

})

// delete todo by id
router.delete("/:id", async(req, res) => {

})

module.exports = router;