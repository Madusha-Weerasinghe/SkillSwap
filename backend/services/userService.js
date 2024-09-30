const userModel = require("../models/userModal");

const createUser = (
  name,
  password,
  email,
  age,
  country,
  skils,
  followers,
  following,
  gender,
  imageURL
) => {
  try {
    if (!name || !password || !email || !age || !country || !gender) {
      throw new Error("detail is required");
    }

    const newUser = userModel.create({
      name: name,
      password: password,
      email: email,
      age: age,
      country: country,
      skils: skils,
      followers: followers,
      following: following,
      gender: gender,
      imageURL: imageURL,
    });

    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

const getUserById = (userid) => {
  try {
    const user = userModel.find({ _id: userid });
    return user || null;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

const getUserByEmail = (email) => {
  try {
    const user = userModel.findOne({ email: email });
    return user || null;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
};
