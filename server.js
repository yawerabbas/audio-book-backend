const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://pratul:p0p0p0p0@cluster0.wfcr7it.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

app.get('/audiobooks', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("kukufm");
    const collection = database.collection("audiobooks");
    const audiobooks = await collection.find({}).toArray();
    res.json(audiobooks);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.get('/audiobooks/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await client.connect();
    const database = client.db("kukufm");
    const collection = database.collection("audiobooks");
    const audiobook = await collection.findOne({ id: id });
    res.json(audiobook);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.post('/audiobooks/:id/rating', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { rating } = req.body;
  try {
    await client.connect();
    const database = client.db("kukufm");
    const collection = database.collection("audiobooks");
    const result = await collection.updateOne({ id: id }, { $push: { ratings: rating } });
    if (result.modifiedCount === 1) {
      res.status(200).send("Rating added successfully");
    } else {
      res.status(404).send("Audiobook not found");
    }
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.post('/audiobooks/:id/review', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { review } = req.body;
  try {
    await client.connect();
    const database = client.db("kukufm");
    const collection = database.collection("audiobooks");
    const result = await collection.updateOne({ id: id }, { $push: { reviews: review } });
    if (result.modifiedCount === 1) {
      res.status(200).send("Review added successfully");
    } else {
      res.status(404).send("Audiobook not found");
    }
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
