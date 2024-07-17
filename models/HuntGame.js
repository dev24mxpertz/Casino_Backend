const mongoose = require("mongoose");

const huntGameSchema = new mongoose.Schema({
  bet_Amount: {
    type: Number,
    default: 0,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Status: {
    type: String,
  },
  Loss_Amount: {
    type: Number,
    default: 0,
  },
  wining_amount: {
    type: Number,
    default: 0,
  },
  Total_Bet_Amount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const huntGameModel = mongoose.model("HuntGame", huntGameSchema);

module.exports = huntGameModel;
