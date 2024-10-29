const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ar_title: {
      type: String,
      required: true,
    },
    state:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "State",
        required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("City", citySchema);
