const express = require("express");
const { connectToDb, getDb } = require("./db");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const port = 5000;

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
  let table = "images";
  db.collection(table)
    .forEach((line) => dataArray.push(line))
    .then(() => {
      res.status(200).json(dataArray);
      console.log("data fetch");
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

const userRouter = require("./routes/users");
const imageRouter = require("./routes/images");
app.use("/users", userRouter);
app.use("/images", imageRouter);
