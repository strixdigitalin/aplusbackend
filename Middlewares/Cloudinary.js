const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "djkvwhl4w",
  api_key: "188614786747447",
  api_secret: "NuIFTBxV8vTTwiUZySsZO-_IEjU",
});
// Upload
const uploadOnCloudinary = async (file) => {
  try {
    console.log("before clound", file);
    const data = await cloudinary.uploader.upload(file.path);
    console.log(data, "<<<thsis is data in cloudinary ");
    return data.secure_url;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = uploadOnCloudinary;
