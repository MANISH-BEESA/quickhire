require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcryptjs') // use only one bcrypt library
const jwt = require('jsonwebtoken')
const User = require('./models/userModel')
const postJobRoute = require("./routes/postJob");
const jobsRoute = require("./routes/jobs");
const jobIdRoute=require("./routes/jobId")
const applyRoute = require("./routes/apply");
const profileRoute = require("./routes/profile");
const cookieParser = require("cookie-parser");
const Application=require("./models/Application")

const app = express()

app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true
}))
app.use(express.json())
app.use(cookieParser());
// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Mongo error:', err))

// ✅ Register Route
app.post('/register', async (req, res) => {
  const { firstname, lastname, username, password,gender } = req.body

  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      firstname,
      lastname,
      username,
      password: hashedPassword,
      gender
    })

    await newUser.save()
    res.status(200).json({ message: 'User registered successfully' })
  } catch (err) {
    console.error('Registration error:', err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

// ✅ Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const existingUser = await User.findOne({ username })
    if (!existingUser) {
      return res.status(401).json({ error: "User doesn't exist" })
    }

    const isMatch = await bcrypt.compare(password, existingUser.password)
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Password" })
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' })

    return res.status(200).json({ message: 'Login successful', jwt_token: token })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


app.use("/", postJobRoute);

app.use("/jobs", jobsRoute);

app.use("/jobs",jobIdRoute)

app.use("/apply", applyRoute);
app.use("/profile", profileRoute);
// GET /jobs/:id/applications
app.get("/jobs/:id/applications", async (req, res) => {
  const { id } = req.params;
  try {
    const applications = await Application.find({ jobId: id }).populate("jobId");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Start Server
app.listen(5174, () => {
  console.log(`🚀 Server running`)
})
