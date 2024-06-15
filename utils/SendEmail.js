const nodemailer = require("nodemailer");

const gmailEmail = "dev24.mxpertz@gmail.com";
const gmailPassword = "pjoe oqje rqxy ucuf";

if (!gmailEmail || !gmailPassword) {
  console.error("Missing email credentials in environment variables");
  process.exit(1);
}

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});


const SendEmail_For_Signup_User = async (to, subject, text, html) => {
  const mailOptions = {
    from: gmailEmail,
    to,
    subject,
    text,
    html,
  };

  try {
    await mailTransport.sendMail(mailOptions);
    const sendedmessage = " SignUp Email sent successfully";
    return sendedmessage;
  } catch (error) {
    return error;
  }
};

const SendEmail_For_Referral_link = async (to, subject, text, html) => {
  const mailOptions = {
    from: gmailEmail,
    to,
    subject,
    text,
    html,
  };

  try {
    await mailTransport.sendMail(mailOptions);
    const sendedmessage = " Referral Link Email sent successfully";
    return sendedmessage;
  } catch (error) {
    return error;
  }
};

const SendEmail_For_F2A_Activation = async (to, subject, text, html) => {
  const mailOptions = {
    from: gmailEmail,
    to,
    subject,
    text,
    html,
  };

  try {
    await mailTransport.sendMail(mailOptions);
    console.log("F2A Activation Email sent successfully");
  } catch (error) {
    console.error("There was an error while sending the email:", error);
  }
};

const SendEmail_For_Subscribe = async (to, subject, text, html) => {
  const mailOptions = {
    from: gmailEmail,
    to,
    subject,
    text,
    html,
  };

  try {
    await mailTransport.sendMail(mailOptions);
    console.log("Subscribe Activation Email sent successfully");
  } catch (error) {
    console.error("There was an error while sending the email:", error);
  }
};

module.exports = {
  SendEmail_For_Signup_User,
  SendEmail_For_Referral_link,
  SendEmail_For_F2A_Activation,
  SendEmail_For_Subscribe,
};


// Example usage
// SendEmail_For_Signup_User('example@example.com', 'Welcome!', 'Thank you for signing up!', '<p>Thank you for signing up!</p>')
//   .then(response => console.log(response))
//   .catch(error => console.error(error));