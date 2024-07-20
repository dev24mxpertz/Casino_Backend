var express = require("express");
var router = express.Router();
const multer = require("multer");
const isAuthorizedUser = require("../middleware/auth");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  Signup_user,
  Signin_user,
  currentAdmin,
  signout,
  Change_Password,
  Activate_Email,
  RegisterUser_token,
} = require("../controllers/indexControllers");

const { uploadImage } = require("../controllers/ImageControllers");

const {
  Makeuser_subscribe,
  Get_AllSubscribers,
} = require("../controllers/SubscriberControllers");

const {
  generate_statics,
  get_User_Calculated_stactics,
} = require("../controllers/StaticsControllers");

const {
  generate_activity,
  get_User_Calculated_activity,
} = require("../controllers/ActivityControllers");

const { generate_Balance } = require("../controllers/BalanceControllers");

const { generate_Rewards } = require("../controllers/RewardControllers");

const {
  generate_Payouts,
  generate_Total_Payouts,
} = require("../controllers/PayoutControllers");

const { generate_Profit } = require("../controllers/ProfitControllers");

const {
  generated_Referrals_Success,
} = require("../controllers/ReferralControllers");

const {
  Signup_admin,
  Signin_admin,
  All_Users_list,
  All_User_Statics,
  All_User_Activity,
  All_User_Rewards,
  All_User_Referrals,
  All_User_Balance,
  All_User_Profit,
  All_User_Payouts,
  All_User_Total_Payouts,
} = require("../controllers/AdminControllers");

const {
  Fetch_Slot_Game_Data,
  Get_All_Slot_Game_Data,
  Fetch_BlackJack_Data,
  Get_BlackJack_Data,
  Fetch_Aviator_Game_Data,
  Get_All_Aviator_Game_Data,
  Fetch_Rouletta_Data,
  Get_All_Rouletta_Game_Data,
  Fetch_Hunt_Game_Data,
  Get_All_Hunt_Game_Data,
  Get_All_Game_Data,
} = require("../controllers/GameControllers");

/* get / ---------------------------------------------------  route ----------------------------------------  */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// ----------------------------------------------------------------------------------------- User Routes ----------------------------

router.post("/api/me", isAuthorizedUser, currentAdmin); //currentAdmin

router.post("/api/Signup", Signup_user); //Signup_user

router.post("/api/login", Signin_user); //Signin_user

router.post(
  "/api/image/upload/:user_id",
  isAuthorizedUser,
  upload.single("image"),
  uploadImage
);

router.get("/api/signout", signout); //Signout

router.post("/api/Change_Password", isAuthorizedUser, Change_Password); //Change Password

router.post("/api/Makeuser_subscribe", Makeuser_subscribe); // Make User Subscribed

router.get("/api/Get_AllSubscribers", Get_AllSubscribers);

router.get("/api/Activate_Email/:user_id", isAuthorizedUser, Activate_Email); // Make User Verified

// ----------------------------------------------------------------------------------------- statics Route -------------------------

router.post("/api/generate_statics", generate_statics);

router.get(
  "/api/get_User_Calculated_stactics/:user_id",
  get_User_Calculated_stactics
);

// ----------------------------------------------------------------------------------------- Activity Route ------------------------

router.post("/api/generate_activity", generate_activity); // Genearte Activity

router.get(
  "/api/get_User_Calculated_activity/:user_id",
  get_User_Calculated_activity
); // Get the user calculated Activity

// ------------------------------------------------------------------------------------------  myBalance Route ---------------------

router.post("/api/generate_Balance", generate_Balance); // Generate Balance

// ------------------------------------------------------------------------------------------ Rewards Route ------------------------
router.post("/api/generate_Rewards", generate_Rewards); // Generate Rewards

//  ----------------------------------------------------------------------------------------- Payout Route  --------------------------

router.post("/api/generate_Payouts", generate_Payouts); // Genertae Payouts

router.post("/api/generate_Total_Payouts", generate_Total_Payouts); // Generate Total Payouts

// ------------------------------------------------------------------------------------------ Generate Profit Routes ------------------

router.post("/api/generate_Profit", generate_Profit);

// ------------------------------------------------------------------------------------------ Generated Referrals Success --------------

router.post("/api/generated_Referrals_Success", generated_Referrals_Success);

// ------------------------------------------------------------------------------------------ RegisterUser_token ------------------------

router.post("/api/RegisterUser_token/:token", RegisterUser_token);

// ------------------------------------------------------------------------------------------ Admin Routes ------------------------------

router.post("/api/Signup_admin", Signup_admin);

router.post("/api/Signin_admin", Signin_admin);

router.get("/api/All_Users_list", All_Users_list);

router.get("/api/All_User_Statics", All_User_Statics);

router.get("/api/All_User_Activity", All_User_Activity);

router.get("/api/All_User_Rewards", All_User_Rewards);

router.get("/api/All_User_Referrals", All_User_Referrals);

router.get("/api/All_User_Balance", All_User_Balance);

router.get("/api/All_User_Profit", All_User_Profit);

router.get("/api/All_User_Payouts", All_User_Payouts);

router.get("/api/All_User_Total_Payouts", All_User_Total_Payouts);

// --------------------------------------------------------------------------------------------------------------------------------------

//Game routes ------

// -----slot game
router.post("/api/Fetch_Slot_Game_Data", Fetch_Slot_Game_Data);

router.get("/api/Get_All_Slot_Game_Data", Get_All_Slot_Game_Data);

// *------Black Jack Data

router.post("/api/Fetch_BlackJack_Data", Fetch_BlackJack_Data);

router.get("/api/Get_BlackJack_Data", Get_BlackJack_Data);

// -----Aaviator game
router.post("/api/Fetch_Aviator_Game_Data", Fetch_Aviator_Game_Data);

router.get("/api/Get_All_Aviator_Game_Data", Get_All_Aviator_Game_Data);

// -------------------Fetch_Rouletta_Data

router.post("/api/Fetch_Rouletta_Data", Fetch_Rouletta_Data);

router.get("/api/Get_All_Rouletta_Game_Data", Get_All_Rouletta_Game_Data);

// -----hunt game
router.post("/api/Fetch_Hunt_Game_Data", Fetch_Hunt_Game_Data);

router.get("/api/Get_All_Hunt_Game_Data", Get_All_Hunt_Game_Data);

// ------------ All Game Data -------------------------------

router.get("/api/Get_All_Game_Data", Get_All_Game_Data);

module.exports = router;
