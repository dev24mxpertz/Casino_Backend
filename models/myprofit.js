const mongoose = require("mongoose");

const myProfitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Profit_Price: {
      type: Number,
      default: 0,
    },
    isClaimed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const MyProfitModel = mongoose.model("myProfit", myProfitSchema);

module.exports = MyProfitModel;
