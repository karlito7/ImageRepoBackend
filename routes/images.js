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

module.exports = router;
