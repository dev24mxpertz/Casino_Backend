const jwt = require('jsonwebtoken')
function generated_ReferralLink(userId) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY);
   const referralLink = `https://brainylingo.azurewebsites.net/${token}`;
  return referralLink;
}

module.exports = generated_ReferralLink;


