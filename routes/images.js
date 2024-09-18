const express = require("express");
const router = express.Router();
const { getDb } = require("../db");
const { ObjectId } = require("mongodb");

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

router.patch("/:id", (req, res) => {
  const db = getDb();
  const body = req.body;
  const imageId = req.params.id;

  if (ObjectId.isValid(imageId)) {
    console.log("PATCHING");

    db.collection("images")
      .updateOne({ _id: new ObjectId(imageId) }, { $set: body })
      .then((result) => {
        console.log("Image Updated");
        return res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ err: "Could not update image" });
      });
  } else {
    res.status(500).json({ error: "Not a valid image id" });
  }
});

router.delete("/:id", (req, res) => {
  const db = getDb();
  const imageId = req.params.id;

  if (ObjectId.isValid(imageId)) {
    db.collection("images")
      .deleteOne({ _id: new ObjectId(imageId) })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        res.status(500).json({ err: "Could not delete image" });
      });
  } else {
    res.status(500).json({ error: "Not a valid image id" });
  }
});

module.exports = router;
