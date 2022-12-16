/* this is where we will define the mongoose schema and the model for all documents
in our databases campsites collection*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    //this stores the text of the comment
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const campsiteSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    elevation: {
      type: Number,
      required: true,
    },
    cost: {
      type: Currency,
      required: true,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },

    /*this will cause every campsite document to be able to contain multiple comment documents
stored within an array*/
    comments: [commentSchema],
  },
  {
    /* causes mongoose to automatically add 2 properties to this scheme:
    1. createdAt & updatedAt (mongoose will manage for us)*/
    timestamps: true,
  }
);

//first argument needs to be singular and capitalized
const Campsite = mongoose.model("Campsite", campsiteSchema);

module.exports = Campsite;
