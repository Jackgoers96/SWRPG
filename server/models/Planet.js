const mongoose = require('mongoose');
// const Snippet = require('./Snippet');

const PlanetSchema = new mongoose.Schema({
    name: String,
    Ecosystem: String,
    Habitable: String
  }
  // snippets [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Snippet',
  //   },
  // ],
)

const PlanetModel = mongoose.model("planets", PlanetSchema);

module.exports = PlanetModel;

