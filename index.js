const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const app = express();

const uri = process.env.DB_PATH;

app.use(cors());
app.use(bodyParser.json());
let client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// database connection:

client.connect((err) => {
  const collection = client.db("redOnionRestaurant").collection("foods");
  // perform actions on the collection object
  collection.insertOne(
    {
      name: "Fuchka",
      price: 50,
      quantity: 20,
    },
    (err, res) => {
      console.log("successfully inserted");
    }
  );
  console.log("database connected...");
  client.close();
});

const port = process.env.PORT || 3002;
app.listen(port, () => console.log("Listen to port 3002"));
