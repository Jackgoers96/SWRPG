const { Schema, model } = require('mongoose');
// const Snippet = require('./Snippet');

const planetSchema = new Schema({
  planetName: {
    type: String,
    required: "You need a title for this planet.",
    trim: true
  },

  PlanetAuthor: {
      type: String,
      required: true,
      trim: true
  },
  // snippets [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Snippet',
  //   },
  // ],
})

const Planet = model('Planet', planetSchema);

module.exports = Planet;

