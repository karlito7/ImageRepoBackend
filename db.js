const { MongoClient } = require("mongodb");
let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(
      "mongodb+srv://romeodombaj:jozR0g3z0Jh2VWJl@clust.kibjja2.mongodb.net/project_governance?retryWrites=true&w=majority"
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
