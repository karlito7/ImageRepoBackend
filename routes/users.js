const express = require("express");
const router = express.Router();
const { getDb } = require("../db");

const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const { authenticateUser } = require("../auth");

const getUsers = (req, res, filter) => {
  const db = getDb();
  let recipes = [];
  db.collection(table)
    .find(filter)
    .sort({ title: 1 })
    .forEach((recipe) => recipes.push(recipe))
    .then(() => {
      res.status(200).json(recipes);
      console.log("data fetch");
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
};

router.get("/", (req, res) => {
  getUsers(req, res);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  getUsers(req, res, { _id: new ObjectId(id) });
});

router.post("/register", async (req, res) => {
  const db = getDb();
  const data = req.body.data;
  const salt = bcrypt.genSaltSync(10);
  const password = await bcrypt.hash(data.password, salt);

  db.collection("users")
    .findOne({
      username: data.username,
    })
    .then((result) => {
      if (!result) {
        db.collection("users")
          .insertOne({
            username: data.username,
            password: password,
          })
          .then(res.status(200).json("registered"))
          .catch((err) => {
            res.status(500).json({ err: "Register error" });
          });
      } else {
        res.status(500).json({ err: "User already exists" });
      }
    });
});

router.post("/login", async (req, res) => {
  const db = getDb();
  let data = req.body.data;
  console.log(data);

  console.log("logging");

  try {
    let result = await authenticateUser(data.username, data.password);

    console.log(result);
    if (result) {
      res.status(200).json(result);
    }
  } catch (e) {
    console.log(e.message);
    res.status(403).json({ error: e.message });
  }
});

module.exports = router;
