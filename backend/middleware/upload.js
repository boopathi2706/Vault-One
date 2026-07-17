const fs = require("fs");
const {cloudinary} = require("../config/cloudinary");

const uploadImage = async (file, folder) => {
  const result = await cloudinary.uploader.upload(file.path, {
    folder,
  });

  fs.unlinkSync(file.path);

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};

module.exports = {
  uploadImage,
};