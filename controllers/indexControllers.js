const sendToken = require("../utils/sendToken");
const catchAsyncError = require("../middleware/catchAsyncError");
const generateReferralCode = require("../utils/generateReferalCode");
const generated_ReferralLink = require("../utils/generateReferalLink");
const User = require("../models/user"); // Adjust the path if necessary
const Admin = require("../models/admin");
const jwt_decode = require("jwt-decode");
const MyReferralModel = require("../models/myReferral");
const MyRewardModel = require("../models/myreward");

const {
  SendEmail_For_F2A_Activation,
  SendEmail_For_Signup_User,
  SendEmail_For_Referral_link,
} = require("../utils/SendEmail");

// const ImageKit = require("imagekit");
// // const Statics = require("../models/statics");
// const Activity = require("../models/activity");
// const MyBalanceModel = require("../models/mybalance");
// const MyPayoutModel = require("../models/payout");

//  ---------------------------------------------------------------------------------------------- Auth Routes -----------

exports.currentAdmin = catchAsyncError(async (req, res, next) => {
  const userType = await req.UserType;
  // console.log(userType);
  try {
    let user;
    if (userType === "User") {
      user = await User.findById(req.id).populate(
        "activity statics myBalance myRewards myPayouts myTotalPayouts myProfits myReferrals"
      );
    } else if (userType === "admin") {
      user = await Admin.findById(req.id).exec();
    }
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

exports.Signin_user = catchAsyncError(async (req, res, next) => {
  try {
    // console.log(req.body);
    const { Email, password } = req.body;
    if (!Email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide Email and password" });
    }

    let user =
      (await User.findOne({ Email: Email }).populate(
        "activity statics myBalance myRewards myPayouts myTotalPayouts myProfits myReferrals"
      )) || (await Admin.findOne({ Email }));

    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.constructor.comparePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    sendToken(user, res, 201);
  } catch (error) {
    console.error("Error signing in user:", error);
    return res.status(500).json({ message: error.message });
  }
});

function generateRandomNumber() {
  let randomNumber = "";
  for (let i = 0; i < 10; i++) {
    randomNumber += Math.floor(Math.random() * 10); // Random digit from 0 to 9
  }
  return randomNumber;
}

exports.Signup_user = catchAsyncError(async (req, res, next) => {
  try {
    const { Email, password, selectedCountry, ageConfirmation } = req.body;
    const randomTenDigitNumber = generateRandomNumber();
    const existingEmail = await User.findOne({ Email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newUser = new User({
      userID: randomTenDigitNumber,
      Email,
      password,
      selectedCountry,
      ageConfirmation,
    });

    const generated_referralCode = await generateReferralCode(newUser._id);
    const generated_referralLink = await generated_ReferralLink(newUser._id);
    newUser.referralCode = generated_referralCode;
    newUser.referralLink = generated_referralLink;
    await newUser.save();

    try {
       SendEmail_For_Signup_User(
        newUser.Email,
        "Welcome to Casino",
        `Thank you ! ${newUser.Email} for Registering in our Casino Project`,
        `<p>Thank you ! ${newUser.Email} for Registering in our Casino Project</p>`
      );
    } catch (error) {
      console.log(error);
    }

    sendToken(newUser, res, 201);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

exports.signout = catchAsyncError(async (req, res, next) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Successfully Logged Out!" });
});

exports.Change_Password = catchAsyncError(async (req, res) => {
  try {
    // console.log(req.body);
    const { user_id, Newpassword } = req.body;
    const user = await User.findById(user_id);
    // console.log(user);
    user.password = Newpassword;
    await user.save();
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

exports.Activate_Email = catchAsyncError(async (req, res) => {
  try {
    const id = req.params.user_id;
    const user = await User.findOne({ _id: id });
    user.isVerfiedEmail = true;
    await user.save();

    try {
      SendEmail_For_F2A_Activation(
        user.Email,
        "Welcome to Casino",
        `Thank you ! ${user.Email} Your F2A is Activated in our Casino Project`,
        `<p>Thank you ! ${user.Email} Your F2A is Activated in our Casino Project</p>`
      );
    } catch (error) {
      console.log(error);
    }

    return res
      .status(201)
      .json({ success: true, user, message: "Email Verified Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: " Internal Server Error " });
  }
});

exports.RegisterUser_token = catchAsyncError(async (req, res) => {
  try {
    const token = req.params.token;
    const { Email, password, selectedCountry, ageConfirmation } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    let decoded;
    try {
      decoded = jwt_decode(token);
    } catch (err) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "Invalid referral token" });
    }

    const existingEmail = await User.findOne({ Email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const randomTenDigitNumber = generateRandomNumber();
    const newUser = new User({
      userID: randomTenDigitNumber,
      Email,
      password,
      selectedCountry,
      ageConfirmation,
    });

    newUser.referralCode = await generateReferralCode(newUser._id);
    newUser.referralLink = await generated_ReferralLink(newUser._id);
    await newUser.save();

    const generatedReferral = new MyReferralModel({
      user: user._id,
      isSuccessFull: true,
      Touser: newUser._id,
    });

    await generatedReferral.save();
    user.myReferrals.push(generatedReferral._id);
    await user.save();

    const generatedReward = new MyRewardModel({
      Reward_Price: 10,
      user: user._id,
    });

    await generatedReward.save();
    user.myRewards.push(generatedReward._id);
    await user.save();

    sendToken(newUser, res, 201);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
