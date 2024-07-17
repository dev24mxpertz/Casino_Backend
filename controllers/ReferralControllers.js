const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/user");
const MyReferralModel = require("../models/myReferral");

// -------------------------------------------------------------------------------------- Referrals Api's --------------------------------

exports.generated_Referrals_Success = catchAsyncError(async (req, res) => {
  try {
    // console.log(req.body);
    const { userID, TouserID } = req.body;

    const user = await User.findOne({ _id: userID });
    
    if (!user) {
      return res
        .status(304)
        .json({ message: "No user has been Founded with this userID" });
    }
    const NewCreateduser = await User.findOne({ _id: TouserID });

    if (!NewCreateduser) {
      return res
        .status(304)
        .json({ message: "No User has been Founded with this TouserID" });
    } else {
      const newReferral = await new MyReferralModel({
        user: userID,
        isSuccessFull: true,
        Touser: TouserID,
      });
      await newReferral.save();
      await user.myReferrals.push(newReferral._id);
      await user.save();
      return res.status(200).json({ newReferral, user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
