const express = require("express");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const port = 5000;

const { connectToDb, getDb } = require("./db");

connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }
});

const userRouter = require("./routes/users");
const imageRouter = require("./routes/images");
app.use("/users", userRouter);
app.use("/images", imageRouter);
