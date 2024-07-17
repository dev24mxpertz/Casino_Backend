const mongoose = require("mongoose");

const myBalanceSchema = new mongoose.Schema({
  Referral_bonus: {
    Available_Balance: { type: Number, default: 0 },
    Locked_Balance: { type: Number, default: 0 },
  },
  Commission_Rewards: { type: Number, default: 0 },
  Crypto_Staking_Rewards: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const MyBalanceModel = mongoose.model("myBalance", myBalanceSchema);

module.exports = MyBalanceModel;
  