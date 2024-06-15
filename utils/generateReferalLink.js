const jwt = require('jsonwebtoken')
function generated_ReferralLink(userId) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY);
  const referralLink = `http://example.com/referral/${token}`; // Example URL structure
  return referralLink;
}

module.exports = generated_ReferralLink;


