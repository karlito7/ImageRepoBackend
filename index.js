const express = require("express");

const app = express();
const cors = require("cors");


const port = 5000;

const { connectToDb, getDb } = require("./db");

connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }
});

app.get("/", (req, res) => {
  const db = getDb();
  let dataArray = [];
  let table = "employees";

  db.collection(table)
    .forEach((line) => dataArray.push(line))
    .then(() => {
      res.status(200).json(dataArray);
      console.log("data fetch");
    })
    .catch(() => {
      console.log("HELo");
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

const userRouter = require("./routes/users");
const imageRouter = require("./routes/images");
app.use("/users", userRouter);
app.use("/images", imageRouter);
