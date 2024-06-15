const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/user"); // Adjust the path if necessary
const MyPayoutModel = require("../models/payout");
const MyTotalPayoutsModel = require("../models/totalpayouts");

//  ---------------------------------------------------------------------------------- Payouts -------------------------------------

exports.generate_Payouts = catchAsyncError(async (req, res) => {
  try {
    const {
      Staking_Pool_Price,
      Total_Next_Payout,
      Payout_Distribution_In,
      Deposit_Price,
      Currency_type_Deposit,
      Exchange_Price,
      Currency_type_Exchange,
      user_id,
    } = req.body;

    const user = await User.findOne({ _id: user_id });

    if (!user) {
      return res
        .status(304)
        .json({ message: "User Not founded with this user_id" });
    }

    const Generated_Payouts = await new MyPayoutModel({
      Staking_Pool_Price: Staking_Pool_Price,
      Total_Next_Payout: Total_Next_Payout,
      Payout_Distribution_In: Payout_Distribution_In,
      Deposit_Amount: {
        Deposit_Price: Deposit_Price,
        Currency_type: Currency_type_Deposit,
      },
      Exchange_Amount: {
        Exchange_Price: Exchange_Price,
        Currency_type: Currency_type_Exchange,
      },
      user: user_id,
    });

    await Generated_Payouts.save();
    await user.myPayouts.push(Generated_Payouts._id);
    await user.save();
    return res.status(201).json({ success: true, Generated_Payouts, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

exports.generate_Total_Payouts = catchAsyncError(async (req, res) => {
  const { Staked_Tokens, Payout_Distributed_In, user_id } = req.body;
  try {

    const timePart = new Date().toISOString().split("T")[1];
    const RemainingtimePart = timePart.split(".")[0]
    // console.log(RemainingtimePart)
    const GeneratedTotalPayouts = new MyTotalPayoutsModel({
      PayoutDate: RemainingtimePart,
      user: user_id,
      Staked_Tokens: Staked_Tokens,
      Payout_Distributed_In: Payout_Distributed_In,
    });
    await GeneratedTotalPayouts.save();

    const user = await User.findOne({ _id: user_id });
    user.myTotalPayouts.push(GeneratedTotalPayouts._id);
    await user.save();
    return res.status(201).json({ GeneratedTotalPayouts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});
