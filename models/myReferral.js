const mongoose = require("mongoose");

const myReferralSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isSuccessFull:{
        type:Boolean,
        default:false
    },
    Touser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
  },
  { timestamps: true }
);

const MyReferralModel = mongoose.model("myReferral", myReferralSchema);

module.exports = MyReferralModel;
