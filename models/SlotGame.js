const mongoose = require("mongoose");

const slotGameSchema = new mongoose.Schema({
  Game_name:{
    type:String,
    default:"Slot Game"
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

const slotGameModel = mongoose.model("SlotGame", slotGameSchema);

module.exports = slotGameModel;
