const mongoose = require("mongoose");

// Define the schema for user game statistics
const staticsSchema = new mongoose.Schema({
  bet_Amount: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  earned_FromStacking: {
    type: Number,
    default: 0,
  },
});

// Create a model using the schema
const Statics = mongoose.model("statics", staticsSchema);

// Export the model
module.exports = Statics;
