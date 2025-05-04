require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const User = require('./models/userModel')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Mongo error:', err))

app.post('/register', async (req, res) => {
  const { firstname, lastname, username, password } = req.body

  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ firstname, lastname, username, password:hashedPassword })
    await newUser.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    console.error('Registration error:', err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

app.listen(5174, () => {
  console.log(`🚀 Server running at http://localhost:5174}`)
})
