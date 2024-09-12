const express = require("express");
const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const userRouter = require("./routes/users");
const imageRouter = require("./routes/images");
app.use("/users", userRouter);
app.use("/images", imageRouter);
