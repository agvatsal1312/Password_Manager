
const express = require('express')
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const bodyparser = require('body-parser')



dotenv.config();

const app = express()
app.use(bodyparser.json())
app.use(cors());




// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'PassOP';


const port = 3000


app.get('/', async (req, res) => {
    const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.send(findResult);
})


app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({success: true});
})

app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({success: true});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})