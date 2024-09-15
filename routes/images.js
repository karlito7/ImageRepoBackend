const express = require("express");
const router = express.Router();
const { getDb } = require("../db");

router.get("/", (req, res) => {
  const db = getDb();

  let images = [];
  db.collection("images")
    .find({})
    .forEach((line) => images.push(line))
    .then(() => {
      res.status(200).json(images);
      console.log("data fetch");
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

router.post("/new", (req, res) => {
  const db = getDb();
  const data = req.body;

  console.log(data);

  db.collection("images")
    .insertOne(data)
    .then((result) => {
      console.log("data upload");
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not add new" });
    });
});

module.exports = router;
