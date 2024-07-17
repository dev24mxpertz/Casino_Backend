const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define the user schema
const userSchema = new mongoose.Schema({
  userID: {
    type: Number,
    require: true,
  },
  Email: {
    type: String,
    required: true,
  },
  isVerfiedEmail: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  selectedCountry: {
    type: String,
    // required: true
  },
  ageConfirmation: {
    type: Boolean,
    // required: true
  },
  UserType: {
    type: String,
    default: "User",
  },
  image: {
    type: String,
    default: "https://ik.imagekit.io/dev19/dummy_3sVZJM0jt.png",
  },
  referralLink: {
    type: String,
    unique: true,
  },
  referralCode: {
    type: String,
    unique: true,
  },
  statics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "statics",
    },
  ],
  activity: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "activity",
    },
  ],
  myBalance: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "myBalance",
    },
  ],
  myRewards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "myReward",
    },
  ],
  myPayouts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "myPayout",
    },
  ],
  myTotalPayouts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "totalpayouts",
    },
  ],
  myProfits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "myProfit",
    },
  ],
  myReferrals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "myReferral",
    },
  ],
});

userSchema.pre("save", async function (next) {
  try {
    // console.log(this.password);
    if (!this.isModified("password") || !this.password) {
      return next(); // Password is not modified or not provided, move to the next middleware
    }
    const saltRounds = parseInt(process.env.SALT_ROUND, 10);
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.statics.comparePassword = async function (
  enteredPassword,
  storedPassword
) {
  try {
    return await bcrypt.compare(enteredPassword, storedPassword);
  } catch (error) {
    throw error;
  }
};

userSchema.methods.jwttoken = async function () {
  try {
    // console.log(this);
      const data = {
        UserType: "User",
      };
      const token = jwt.sign(
        { id: this._id, ...data },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
      return token;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
