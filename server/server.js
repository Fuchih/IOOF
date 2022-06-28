const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let members = []

app.post('/api/v1', (req, res) => {
  // should receive data from client side
  if (!Object.keys(req.body).length) {
    return res
      .status(400)
      .json({ message: 'No data received, please try again' })
  }

  const newMember = req.body
  members.push(newMember)
  res.send('Data have been saved')
})

app.get('/api/v1', (req, res) => {
  res.json(members)
})

const port = 8080

const start = () => {
  try {
    app.listen(port, console.log(`server is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
