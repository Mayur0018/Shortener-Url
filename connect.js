const mongoose = require("mongoose");

async function ConnectionMongodb(url) {
  return mongoose.connect(url);
}

module.exports = {
  ConnectionMongodb,
};
