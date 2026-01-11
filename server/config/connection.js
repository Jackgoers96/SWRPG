const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(
  "mongodb://localhost:27017/planet",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

module.exports = mongoose.connection;

