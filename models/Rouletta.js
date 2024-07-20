const mongoose = require("mongoose");

const RoulettaSchema = new mongoose.Schema({
  Game_name: {
    type: String,
    default: "Rouletta",
  },
  Status: {
    type: String,
    default: "",
  },
  bet_Amount: {
    type: Number,
    default: 0,
  },
  Multiplier_Number: {
    type: Number,
    default: 0,
  },
  Total_Amount_Userhave: {
    type: Number,
    default: 0,
  },
  Total_Amount_Bets: {
    type: Number,
    default: 0,
  },
  Betted_Amount: {
    type: Number,
    default: 0,
  },
  winningBet: {
    type: String,
    default: "",
  },
  bets: {},
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  Winning_amount: {
    type: Number,
    default: 0,
  },
  Lossing_Amount: {
    type: Number,
    default: 0,
  },
  winingBets: {},
});

const RoulettaModel = mongoose.model("Rouletta", RoulettaSchema);

module.exports = RoulettaModel;
