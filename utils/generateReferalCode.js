function generateReferralCode(userId) {
  const codeLength = 8; // Length of the referral code
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabc";
  let referralCode = '';
  for (let i = 0; i < codeLength; i++) {
    referralCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  let userReferralCode = referralCode + "_" + userId
  return userReferralCode;
}

module.exports = generateReferralCode;
