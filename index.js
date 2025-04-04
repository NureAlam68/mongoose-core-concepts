const express = require('express')
const app = express()
const port = 5000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Mongoose CRUD API')
})

app.listen(port, () => {
  console.log(`Mongoose app listening on port ${port}`)
})