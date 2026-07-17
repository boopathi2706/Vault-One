const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const checkCloudinary = async () => {
  try {
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary Connected");
  } catch (error) {
    console.log("❌ Cloudinary Connection Failed");
  }
};
checkCloudinary();
module.exports = {
  cloudinary,
  checkCloudinary
};