const express = require("express");
const cors = require("cors")
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const port = 5000;

// Allow requests from frontend (localhost:3000)
app.use(cors({
  origin: "http://localhost:3000", // Allow only this origin
  methods: ["GET", "POST"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"] // Allow these headers
}));

app.use(express.json());

// MongoDB connection URI
const uri = process.env.MONGO_URI;
const db_name = process.env.MONGO_DB_NAME;

const client = new MongoClient(uri);

app.post("/api/add-memory", async (req, res) => {
  const { songID, memoryDescription } = req.body;

  console.log("Song ID: ", songID)
  console.log("Memory Description: ", memoryDescription)

  try {
    await client.connect();
    const database = client.db(db_name);
    const collection = database.collection("memories");

    const newMemory = { songID, memoryDescription, dateCreated: new Date() };
    const result = await collection.insertOne(newMemory);

    res.status(200).json({ message: "Memory added successfully", result });
  } catch (error) {
    console.error("Error adding memory:", error);
    res.status(500).json({ message: "Failed to add memory" });
  } finally {
    await client.close();
  }
});

app.get("/api/getMemory/:songID", async (req, res) => {
  try {
    const { songID } = req.params

    await client.connect();
    const memory = await client.db(db_name).collection("memories").findOne({ songID });

    if (!memory) {
      return res.status(404).json({ message: "No memory found for this song." });
    }

    res.json({ memoryDescription: memory.memoryDescription, dateCreated: memory.dateCreated });
  } catch (error) {
      console.error("Error fetching memory:", error);
      res.status(500).json({ message: "Server error" });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
