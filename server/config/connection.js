const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(
  process.env.PLANET_SCHEMA,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

module.exports = mongoose.connection;

