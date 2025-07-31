const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// MongoDB setup
const uri = process.env.MONGO_URI;
const db_name = process.env.MONGO_DB_NAME;
const client = new MongoClient(uri);

// Connect once and reuse
let db;
client.connect()
  .then(() => {
    db = client.db(db_name);
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if initial connection fails
  });

app.post("/api/add-memory", async (req, res) => {
  const { songID, memoryDescription, username } = req.body;

  try {
    const users = db.collection("users");
    const collection = db.collection("memories");

    const user = await users.findOne({ username });

    const newMemory = { 
      songID: songID, 
      entries: [{
        text: memoryDescription,
        username: user.username,
        display: user.display,
        date: new Date()
      }]
    }

    const result = await collection.insertOne(newMemory);

    res.status(200).json({ message: "Memory added successfully", result });
  } catch (error) {
    console.error("Error adding memory:", error);
    res.status(500).json({ message: "Failed to add memory" });
  }
});

app.post("/api/add-reply", async (req, res) => {
  const { songID, replyDescription, username } = req.body;

  try {
    const users = db.collection("users");
    const collection = db.collection("memories");

    const user = await users.findOne({ username });
    const memory = await collection.findOne({ songID });

    if (!memory) {
      console.error("Error finding Song ID: ", songID);
      return res.status(500).json({ message: "Failed to find Song ID" });
    }

    const newEntry = { 
      text: replyDescription,
      username: user.username,
      display: user.display,
      date: new Date()
    }

    const result = await collection.updateOne(
      { songID },
      { $push: {entries: newEntry}}
    )

    res.status(200).json({ message: "Reply added successfully", result });
  } catch (error) {
    console.error("Error adding reply:", error);
    res.status(500).json({ message: "Failed to add reply" });
  }
});

app.get("/api/getMemory/:songID", async (req, res) => {
  try {
    const { songID } = req.params;
    const memory = await db.collection("memories").findOne({ songID });

    if (!memory) {
      return res.status(404).json({ message: "No memory found for this song." });
    }

    res.json({ entries: memory.entries });
  } catch (error) {
    console.error("Error fetching memory:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
      const users = db.collection("users");

      // Find the user by username
      const user = await users.findOne({ username });

      if (!user) {
          return res.status(401).json({ message: "Invalid username" });
      }

      if (password != user.password) {
          return res.status(401).json({ message: "Invalid password" });
      }

      res.status(200).json({
          user: {
              username: user.username,
              display: user.display
          },
      });
  } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
