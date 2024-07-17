const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/user"); // Adjust the path if necessary
const Statics = require("../models/statics");
const Activity = require("../models/activity");
const MyRewardModel = require("../models/myreward");
const MyReferralModel = require("../models/myReferral");
const MyBalanceModel = require("../models/mybalance");
const MyProfitModel = require("../models/myprofit")
const MyPayoutModel  = require('../models/payout')
const MyTotalPayoutsModel = require('../models/totalpayouts')
const Admin = require("../models/admin");
const SubscribeModel = require('../models/subscribemodel')
const sendToken = require("../utils/sendToken");
// -----------------------------------------------------------------------------------------  Activity  ---------------------------------

exports.Signup_admin = catchAsyncError(async (req, res, next) => {
  try {
    const { Username, Email, Password } = req.body;
    // Check if the username already exists
    const existingUser = await Admin.findOne({ Username });
    if (existingUser) {
      return res.status(409).json({ message: "admin Username already exists" });
    }
    // Create a new admin instance
    const newadmin = new Admin({
      Username,
      Email,
      password:Password,
    });
    // Save the new admin to the database
    await newadmin.save();
    // Generate a JWT token for the newly registered user
    sendToken(newadmin, res, 201);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

exports.Signin_admin = async (req, res, next) => {
  try {
    const { Username, Password } = req.body;
    // Check if the username exists
    const admin = await Admin.findOne({ Username });
    if (!admin) {
      return res.status(401).json({
        message: `Authentication failed admin Username didn't exists`,
      });
    }
    // Compare the entered password with the stored hashed password
    const passwordMatch = await Admin.comparePassword(Password, admin.password);
    if (passwordMatch) {
      // Generate a JWT token for the authenticated user
      sendToken(admin, res, 201);
    } else {
      return res.status(401).json({
        message: `Authentication failed admin Password didn't exists`,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.All_Users_list = catchAsyncError(async (req, res, next) => {
  try {
    const All_users = await User.find().populate(
      "activity statics myBalance myRewards myPayouts myTotalPayouts myProfits myReferrals"
    );
    return res.status(200).json({ All_users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

exports.All_User_Statics = catchAsyncError(async (req, res, next) => {
  try {
    const AllUsers_Statics = await Statics.find().populate("user");
    return res.status(200).json({ AllUsers_Statics });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

exports.All_User_Activity = catchAsyncError(async (req, res, next) => {
  try {
    const AllUsers_Activity = await Activity.find().populate("user");
    return res.status(200).json({ AllUsers_Activity });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

exports.All_User_Rewards = catchAsyncError(async (req, res, next) => {
  try {
    const AllUsers_Rewards = await MyRewardModel.find().populate("user");
    return res.status(200).json({ AllUsers_Rewards });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

exports.All_User_Referrals = catchAsyncError(async (req, res, next) => {
  try {
    const AllUsers_Referrals = await MyReferralModel.find().populate(
      "user Touser"
    );
    return res.status(200).json({ AllUsers_Referrals });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

exports.All_User_Balance = catchAsyncError(async (req, res, next) => {
  try {
    const AllUsers_Balance = await MyBalanceModel.find().populate("user");
    return res.status(200).json({ AllUsers_Balance });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

exports.All_User_Profit = catchAsyncError(async (req, res, next) => {
  try {
    const AllUsers_Profit = await MyProfitModel.find().populate("user");
    return res.status(200).json({ AllUsers_Profit });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

exports.All_User_Payouts = catchAsyncError(async (req, res, next) => {
  try {
    const AllUsers_Payouts = await MyPayoutModel.find().populate("user");
    return res.status(200).json({ AllUsers_Payouts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

exports.All_User_Total_Payouts = catchAsyncError(async (req, res, next) => {
  try {
    const AllUsers_Total_Payouts = await MyTotalPayoutsModel.find().populate(
      "user"
    );
    return res.status(200).json({ AllUsers_Total_Payouts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

