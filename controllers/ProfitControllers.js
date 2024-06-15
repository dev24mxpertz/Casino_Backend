const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/user"); // Adjust the path if necessary
const MyProfitModel = require("../models/myprofit");

//  -------------------------------------------------------------------------------------------- Rewards ------------------------------------

exports.generate_Profit = catchAsyncError( async (req, res) => {
  try {
    const { userID, Profit_Price } = req.body;
    const user = await User.findOne({ _id: userID });

    if (!user) {
      return res
        .status(304)
        .json({ message: "No user Founded with this userID " });
    }

    const Generated_Profit = await new MyProfitModel({
      Profit_Price: Profit_Price,
      user: userID,
    });

    await Generated_Profit.save();
    await user.myProfits.push(Generated_Profit._id);
    await user.save();
    return res.status(201).json({ Generated_Profit });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});


