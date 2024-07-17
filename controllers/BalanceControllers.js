
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/user"); // Adjust the path if necessary
const MyBalanceModel = require("../models/mybalance");


//  ----------------------------------------------------------------------------------------- Balance ------------------------------------

exports.generate_Balance = catchAsyncError(async (req, res) => {
  try {
    const {
      Available_Balance,
      Locked_Balance,
      Commission_Rewards,
      Crypto_Staking_Rewards,
      userID,
    } = req.body;

    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.status(304).json({ message: "No User Found" });
    }

    const ExistingBalance = await MyBalanceModel.findOne({ user: userID });
    if (ExistingBalance) {
      ExistingBalance.Referral_bonus.Available_Balance +=
        parseInt(Available_Balance);
      ExistingBalance.Referral_bonus.Locked_Balance += parseInt(Locked_Balance);
      ExistingBalance.Commission_Rewards += parseInt(Commission_Rewards);
      ExistingBalance.Crypto_Staking_Rewards += parseInt(
        Crypto_Staking_Rewards
      );
      await ExistingBalance.save();
      await user.save();
      return res.status(201).json({ success: true, user });
    } else {
      const Current_Balance = await new MyBalanceModel({
        Referral_bonus: {
          Available_Balance: parseInt(Available_Balance),
          Locked_Balance: parseInt(Locked_Balance),
        },
        Commission_Rewards: parseInt(Commission_Rewards),
        Crypto_Staking_Rewards: parseInt(Crypto_Staking_Rewards),
        user: userID,
      });
      await Current_Balance.save();
      await user.myBalance.push(Current_Balance._id);
      await user.save();
      return res.status(201).json({ success: true, user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});