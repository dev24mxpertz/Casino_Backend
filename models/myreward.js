const mongoose = require("mongoose");

const myRewardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Reward_Price: {
    type: Number,
    default: 0,
  },
  isClaimed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const MyRewardModel = mongoose.model("myReward", myRewardSchema);

module.exports = MyRewardModel;
