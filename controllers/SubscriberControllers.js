const catchAsyncError = require("../middleware/catchAsyncError");
const SubscribeModel = require("../models/subscribemodel");
const { SendEmail_For_Subscribe } = require("../utils/SendEmail");

exports.Makeuser_subscribe = catchAsyncError(async (req, res) => {
  const { Email } = req.body;
  try {
    if (!Email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const existingSubscriber = await SubscribeModel.findOne({ email: Email });
    if (existingSubscriber) {
      return res.status(500).json({ message: "Email is already subscribed" });
    } else {
      const newSubscriber = new SubscribeModel({ email: Email });
      const savedSubscriber = await newSubscriber.save();

        try {
          SendEmail_For_Subscribe(
            newSubscriber.email,
            "Welcome to Casino",
            `Thank you ! ${newSubscriber.email} for Subscribing in our Casino Project`,
            `<p>Thank you ! ${newSubscriber.email} for Subscribing in our Casino Project</p>`
          );
        } catch (error) {
          console.log(error);
        }

      return res.status(201).json({
        message: "Success You have subscribed !",
        subscriber: savedSubscriber,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

exports.Get_AllSubscribers = catchAsyncError(async (req, res, next) => {
  try {
    const AllSubscribers = await SubscribeModel.find();
    return res.status(200).json({ AllSubscribers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = exports;
