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

// how get/load products data from server
app.get("/foods", (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });

  client.connect((err) => {
    const collection = client.db("redOnionRestaurant").collection("foods");
    // perform actions on the collection object
    collection.find().toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(documents);
      }
    });

    client.close();
  });
});

// // how get dynamic data of products key asked by user from server
app.get("/food/:id", (req, res) => {
  const id = Number(req.params.id); // read user request

  client = new MongoClient(uri, { useNewUrlParser: true });

  client.connect((err) => {
    const collection = client.db("redOnionRestaurant").collection("foods");
    // perform actions on the collection object
    collection.find({ id: id }).toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(documents[0]);
      }
    });

    client.close();
  });
});

// how to post all product data to server
app.post("/addFood", (req, res) => {
  // save to database
  const food = req.body;
  client = new MongoClient(uri, { useNewUrlParser: true });

  client.connect((err) => {
    const collection = client.db("redOnionRestaurant").collection("foods");
    // perform actions on the collection object
    collection.insert(food, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops[0]);
      }
    });

    client.close();
  });
});

// post orders
app.post("/placeOrder", (req, res) => {
  // save to database
  const food = req.body;
  client = new MongoClient(uri, { useNewUrlParser: true });

  client.connect((err) => {
    const collection = client.db("redOnionRestaurant").collection("orders");
    // perform actions on the collection object
    collection.insert(food, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops[0]);
      }
    });

    client.close();
  });
});

const port = process.env.PORT || 3002;
app.listen(port, () => console.log("Listen to port 3002"));
