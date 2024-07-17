const catchAsyncError = require("../middleware/catchAsyncError");
const ImageKit = require("imagekit");
const User = require("../models/user"); // Adjust the path if necessary

// ----------------------------------------------------------------------------------------------- ImageKit Routes ---------

var imagekit = new ImageKit({
  publicKey: "public_s9UEwIJrtesNhEeT4uv0hklRmzc=",
  privateKey: "private_kP7A0uR8qBVwB4AAN35xkr/UwmU=",
  urlEndpoint: "https://ik.imagekit.io/dev19",
});

exports.uploadImage = catchAsyncError(async (req, res) => {
  try {
    // console.log(req.body)
    // console.log(req.file)
    const id = req.params.user_id;
    const imageData = req.file.buffer.toString("base64"); // Convert file to base64
    imagekit.upload(
      {
        file: imageData,
        fileName: req.file.originalname, // Use original file name
      },
      async function (error, result) {
        if (error) {
          res
            .status(500)
            .json({ error: "An error occurred while uploading the image" });
        } else {
          const imageUrl = result.url;
          // console.log(imageUrl)
          const user = await User.findByIdAndUpdate(id, {
            image: imageUrl,
          });
          user.save();
          res
            .status(200)
            .json({ message: "User image updated successfully", user });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
});

module.exports = exports;
