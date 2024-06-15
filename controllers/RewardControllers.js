const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/user"); // Adjust the path if necessary
const MyRewardModel = require("../models/myreward");


//  -------------------------------------------------------------------------------------------- Rewards ------------------------------------

exports.generate_Rewards = catchAsyncError(async (req, res) => {
  try {
    const { userID, Reward_Price } = req.body;
    const user = await User.findOne({ _id: userID });

    if (!user) {
      return res
        .status(304)
        .json({ message: "No user Founded with this userID " });
    }

    const Generated_Reward = await new MyRewardModel({
      Reward_Price: Reward_Price,
      user: userID,
    });

    await Generated_Reward.save();
    await user.myRewards.push(Generated_Reward._id);
    await user.save();
    return res.status(201).json({ Generated_Reward });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});
