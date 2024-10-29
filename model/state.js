const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ar_title: {
      type: String,
      required: true,
    },
    country:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
        required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("State", stateSchema);
