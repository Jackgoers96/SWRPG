const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(
  "mongodb://localhost:27017/planets",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

module.exports = mongoose.connection;

