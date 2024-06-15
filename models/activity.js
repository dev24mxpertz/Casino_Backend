const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  Tips: {
    type: Number,
    default: 0,
  },
  coinDrops: {
    type: Number,
    default: 0,
  },
  Rainfall: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Create a model using the schema
const Activity = mongoose.model("activity", activitySchema);

// Export the model
module.exports = Activity;
