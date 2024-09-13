const { MongoClient } = require("mongodb");
let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(
      "mongodb+srv://kpericic:X9ZhorGfGcAapjX4@cluster0.bpyli.mongodb.net/image_repo?retryWrites=true&w=majority"
    )
      .then((client) => {
        dbConnection = client.db();
        console.log("Connected to db");
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
