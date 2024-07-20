const mongoose = require("mongoose");

const BlackJackSchema = new mongoose.Schema({
  Game_name: {
    type: String,
    default: "BlackJack",
  },
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
  dealerSum: {
    type: Number,
    default: 0,
  },
  walletAmount: {
    type: Number,
    default: 0,
  },
  yourSum: {
    type: Number,
    default: 0,
  },
  wining_Amount: {
    type: Number,
    default: 0,
  },
  loss_Amount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BlackJackModel = mongoose.model("BlackJack", BlackJackSchema);

module.exports = BlackJackModel;
