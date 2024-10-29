const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ar_title: {
      type: String,
      required: true,
    },
    isoCode:{
      type: String,
      required: true,
    },
    phoneCode: {
      type: String,
      required: true,
    },
    currency:{
      type:String,
      required: true,
    },
    latitude:{
      type:Number,
      default:0.0
    },
    longitude:{
      type:Number,
      default:0.0
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Country", countrySchema);
