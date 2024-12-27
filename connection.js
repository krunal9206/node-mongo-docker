const mongoose = require("mongoose");

const mongoDBConnection = mongoose.connect(
  "mongodb://root:example@mongo:27017/"
);

module.exports = mongoDBConnection;
