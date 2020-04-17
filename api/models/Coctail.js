const mongoose = require('mongoose');

const CoctailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  recipe: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    default: false
  },
  ingredients: {
    type: [mongoose.Schema.Types.Mixed],
    required: true
  },
  rating: {
    type: [mongoose.Schema.Types.Mixed],
  }
},
{
  versionKey: false
});

const Coctail = mongoose.model('Coctail', CoctailSchema);

module.exports = Coctail;