const express = require("express")
const { MongoClient, ObjectId } = require("mongodb")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

async function connectToDatabase() {
  try {
    await client.connect()
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
  }
}

connectToDatabase()

app.get("/tasks", async (req, res) => {
  try {
    const database = client.db("taskdb")
    const tasks = database.collection("tasks")
    const result = await tasks.find({}).toArray()
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" })
  }
})

app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body
    const database = client.db("taskdb")
    const tasks = database.collection("tasks")
    const result = await tasks.insertOne({ title, description })
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ error: "Error creating task" })
  }
})

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { title, description } = req.body
    const database = client.db("taskdb")
    const tasks = database.collection("tasks")
    const result = await tasks.updateOne({ _id: new ObjectId(id) }, { $set: { title, description } })
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: "Error updating task" })
  }
})

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params
    const database = client.db("taskdb")
    const tasks = database.collection("tasks")
    const result = await tasks.deleteOne({ _id: new ObjectId(id) })
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

