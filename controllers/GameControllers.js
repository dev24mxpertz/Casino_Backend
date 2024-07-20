const catchAsyncError = require("../middleware/catchAsyncError");
const slotGameModel = require("../models/SlotGame");
const BlackJackModel = require("../models/BlackJack");
const RoulettaModel = require("../models/Rouletta");
const huntGameModel = require("../models/HuntGame");
const AviatorGameModel = require("../models/AviatorGame");

exports.Fetch_Slot_Game_Data = catchAsyncError(async (req, res, next) => {
  try {
    // Destructure required fields from req.body
    const {
      bet_Amount,
      userID,
      Status,
      Loss_Amount,
      wining_amount,
      Total_Bet_Amount,
    } = req.body;

    // Create a new instance of slotGameModel with the received data
    const gameUser = new slotGameModel({
      bet_Amount,
      userID,
      Status,
      Loss_Amount,
      wining_amount,
      Total_Bet_Amount,
    });

    // Save the instance to the database
    await gameUser.save();
    // Return success response with the saved data
    return res.status(200).json({ Game_user: gameUser });
  } catch (error) {
    console.error("Error in Fetch_Slot_Game_Data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

exports.Get_All_Slot_Game_Data = catchAsyncError(async (req, res, next) => {
  try {
    const All_slotGame_Data = await slotGameModel.find().populate("userID");
    return res.status(200).json({ All_slotGame_Data: All_slotGame_Data });
  } catch (error) {
    console.error("Error in Fetch_Slot_Game_Data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fetch_BlackJack_Data;

exports.Fetch_BlackJack_Data = catchAsyncError(async (req, res, next) => {
  try {
    // Destructure required fields from req.body
    console.log(req.body);
    const {
      dealerSum,
      betAmount,
      walletAmount,
      yourSum,
      Status,
      userID,
      wining_Amount,
      loss_Amount,
    } = req.body;

    // Create a new instance of slotGameModel with the received data
    const gameUser = new BlackJackModel({
      dealerSum,
      bet_Amount: betAmount,
      walletAmount,
      yourSum,
      Status,
      userID,
      wining_Amount,
      loss_Amount,
    });

    // // Save the instance to the database
    await gameUser.save();
    // // Return success response with the saved data
    return res.status(200).json({ Game_user: gameUser });
  } catch (error) {
    console.error("Error in Fetch_Slot_Game_Data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

exports.Get_BlackJack_Data = catchAsyncError(async (req, res, next) => {
  try {
    const All_BlackJack_Data = await BlackJackModel.find().populate("userID");
    return res.status(200).json({ All_BlackJack_Data: All_BlackJack_Data });
  } catch (error) {
    console.error("Error in Fetch_Slot_Game_Data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// ============================Aviator-Game===================================

exports.Fetch_Aviator_Game_Data = catchAsyncError(async (req, res, next) => {
  try {
    // Destructure required fields from req.body
    console.log(req.body);
    const {
      bet_Amount,
      userID,
      Status,
      Loss_Amount,
      wining_amount,
      Total_Bet_Amount,
    } = req.body;

    // Create a new instance of slotGameModel with the received data
    const gameUser = new AviatorGameModel({
      bet_Amount,
      userID,
      Status,
      Loss_Amount,
      wining_amount,
      Total_Bet_Amount,
    });

    // Save the instance to the database
    await gameUser.save();
    // Return success response with the saved data
    return res.status(200).json({ Game_user: gameUser });
  } catch (error) {
    console.error("Error in Fetch_Aviator_Game_Data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

exports.Get_All_Aviator_Game_Data = catchAsyncError(async (req, res, next) => {
  try {
    const All_aviatorGame_Data = await AviatorGameModel.find().populate(
      "userID"
    );
    return res.status(200).json({ All_aviatorGame_Data: All_aviatorGame_Data });
  } catch (error) {
    console.error("Error in Fetch_Aviator_Game_Data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// ---------------------------------------------------------------------------- Rouletta

exports.Fetch_Rouletta_Data = catchAsyncError(async (req, res, next) => {
  try {
    // Log the request body
    // console.log(req.body);

    const {
      Status,
      bet_Price,
      Multiplier_Number,
      Total_Amount_Userhave,
      Total_Amount_Bets,
      Betted_Amount,
      winningBet,
      bets,
      userID,
      Winning_amount,
      Lossing_Amount,
      winingBets,
    } = req.body;

    // Create a new Rouletta entry
    const createdRouletta = new RoulettaModel({
      Status: Status,
      bet_Amount: bet_Price,
      Multiplier_Number: Multiplier_Number,
      Total_Amount_Userhave: Total_Amount_Userhave,
      Total_Amount_Bets: Total_Amount_Bets,
      Betted_Amount: Betted_Amount,
      winningBet: winningBet,
      bets: bets,
      userID: userID,
      wining_amount: Winning_amount,
      Lossing_Amount: Lossing_Amount,
      winingBets: winingBets,
    });
    // console.log(createdRouletta)

    await createdRouletta.save();

    // Send the created Rouletta data in the response
    return res.status(201).json({
      message: "Rouletta data created successfully",
      data: createdRouletta,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

exports.Get_All_Rouletta_Game_Data = catchAsyncError(async (req, res, next) => {
  try {
    const All_RoulettaGame_Data = await RoulettaModel.find().populate("userID");
    return res.status(200).json({ All_RoulettaGame_Data });
  } catch (error) {
    console.error("Error in Get_All_Rouletta_Game_Data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// ------------------------  Hunt-the-ace

exports.Fetch_Hunt_Game_Data = catchAsyncError(async (req, res, next) => {
  try {
    // Destructure required fields from req.body
    const {
      bet_Amount,
      userID,
      Status,
      Loss_Amount,
      wining_amount,
      Total_Bet_Amount,
    } = req.body;

    // Create a new instance of huntGameModel with the received data
    const gameUser = new huntGameModel({
      bet_Amount,
      userID,
      Status,
      Loss_Amount,
      wining_amount,
      Total_Bet_Amount,
    });

    // Save the instance to the database
    await gameUser.save();
    // Return success response with the saved data
    return res.status(200).json({ Game_user: gameUser });
  } catch (error) {
    console.error("Error in Fetch_Hunt_Game_Data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

exports.Get_All_Hunt_Game_Data = catchAsyncError(async (req, res, next) => {
  try {
    const All_huntGame_Data = await huntGameModel.find().populate("userID");

    return res.status(200).json({ All_huntGame_Data: All_huntGame_Data });
  } catch (error) {
    console.error("Error in Get_All_Hunt_Game_Data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//Get_All_Game_Data

exports.Get_All_Game_Data = catchAsyncError(async (req, res, next) => {
  try {
    const BlackJack_Data = await huntGameModel.find().populate("userID");
    const All_aviatorGame_Data = await AviatorGameModel.find().populate(
      "userID"
    );
    const All_RoulettaGame_Data = await RoulettaModel.find().populate("userID");
    const All_BlackJack_Data = await BlackJackModel.find().populate("userID");
    const All_slotGame_Data = await slotGameModel.find().populate("userID");

    const All_Game_Data = [
      ...BlackJack_Data,
      ...All_aviatorGame_Data,
      ...All_RoulettaGame_Data,
      ...All_BlackJack_Data,
      ...All_slotGame_Data,
    ];
    return res.status(200).json({ All_Game_Data: All_Game_Data });
  } catch (error) {
    console.error("Error in Getting_all_game_data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
