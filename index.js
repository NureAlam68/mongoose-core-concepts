const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require("./todoHandler/todoHandler")

const app = express();
const port = 5000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/todos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// application routes
app.use("/todo", todoHandler);

app.get('/', (req, res) => {
  res.send('Mongoose CRUD API');
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});
