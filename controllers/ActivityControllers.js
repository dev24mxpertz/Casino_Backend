const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/user"); // Adjust the path if necessary
const Activity = require("../models/activity");

// -----------------------------------------------------------------------------------------  Activity  ---------------------------------

exports.generate_activity = catchAsyncError(async (req, res) => {
  try {
    // console.log(req.body)
    const { Tips, userID, coinDrops, Rainfall } = req.body;
    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.status(304).json({ message: "No User Found" });
    }
    const user_activity = await new Activity({
      Tips,
      user: user._id,
      coinDrops,
      Rainfall,
    });
    await user_activity.save();

    // ------------------------------------------ Update user Schema ---------------

    await user.activity.push(user_activity._id);
    await user.save();
    return res.status(201).json({ success: true, user, user_activity });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error });
  }
});

exports.get_User_Calculated_activity = catchAsyncError(async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const user = await User.findById(user_id).populate("activity");

    if (!user) {
      return res
        .status(304)
        .json({ message: "No User have been Founded with this user_id" });
    }

    let Total_Tips = 0;
    let Total_coinDrops = 0;
    let Total_Rainfall = 0;

    for (const activity of user.activity) {
      Total_Tips += activity.Tips;
      Total_coinDrops += activity.coinDrops;
      Total_Rainfall += activity.Rainfall;
    }

    let activityData = {
      Total_Tips,
      Total_coinDrops,
      Total_Rainfall,
    };
    return res.status(201).json({ activityData });
  } catch (error) {
    res.status(500).json({ error });
  }
});
