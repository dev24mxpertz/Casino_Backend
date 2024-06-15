const mongoose = require("mongoose");

const myPayoutSchema = new mongoose.Schema({
  Staking_Pool_Price: { type: Number, default: 0 },
  Total_Next_Payout: { type: Number, default: 0 },
  Payout_Distribution_In: { type: Number, default: 0 },
  Deposit_Amount: {
    Deposit_Price: { type: Number, default: 0 },
    Currency_type: { type: String, default: "USD" },
  },
  Exchange_Amount: {
    Exchange_Price: { type: Number, default: 0 },
    Currency_type: { type: String, default: "USD" },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const MyPayoutModel = mongoose.model("myPayout", myPayoutSchema);

module.exports = MyPayoutModel;
