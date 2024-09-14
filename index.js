const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({ limit: "50", extended: true, parameterLimit: 50000 })
);

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
