
const User = require("../models/user"); // Adjust the path if necessary
const Statics = require("../models/statics");
const sendToken = require("../utils/sendToken");
const catchAsyncError = require("../middleware/catchAsyncError");

// ---------------------------------------------------------------------------------------- Statics -----------------

exports.generate_statics = catchAsyncError(async (req, res) => {
  try {
    // console.log(req.body)
    const { bet_Amount, userID, earned_FromStacking } = req.body;
    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.status(304).json({ message: "No User Found" });
    }
    const user_statics = await new Statics({
      bet_Amount,
      user: user._id,
      earned_FromStacking,
    });
    await user_statics.save();

    // ------------------------------------------ Update user Schema ---------------

    await user.statics.push(user_statics._id);
    await user.save();
    return res.status(201).json({ success: true, user, user_statics });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

exports.get_User_Calculated_stactics = catchAsyncError(async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const user = await User.findById(user_id).populate("statics");

    if (!user) {
      return res
        .status(304)
        .json({ message: "No User have been Founded with this user_id" });
    }

    let Total_bet_Amount = 0;
    let Total_earned_FromStacking = 0;
    let Total_length_of_bets = user.statics.length;

    for (const statics of user.statics) {
      Total_bet_Amount += statics.bet_Amount;
      Total_earned_FromStacking += statics.earned_FromStacking;
    }

    let staticsData = {
      Total_bet_Amount,
      Total_earned_FromStacking,
      Total_length_of_bets,
    };
    return res.status(201).json({ staticsData });
  } catch (error) {
    res.status(500).json({ error });
  }
});
