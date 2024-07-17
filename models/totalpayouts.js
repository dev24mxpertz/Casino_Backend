const mongoose = require("mongoose");

const totalpayoutsSchema = new mongoose.Schema({
  PayoutDate: { type: String, require: true },
  Staked_Tokens: { type: Number, default: 0 },
  Payout_Distributed_In: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const MyTotalPayoutsModel = mongoose.model("totalpayouts", totalpayoutsSchema);

module.exports = MyTotalPayoutsModel;
