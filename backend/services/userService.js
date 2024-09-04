const userModel = require("../models/userModal");

const createUser = (name, password, email, age, country) => {
  try {
    if (!name || !password || !email || !age || !country) {
      throw new Error("detail is required");
    }

    const newUser = userModel.create({
      name: name,
      password: password,
      email: email,
      age: age,
      country: country,
    });

    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

const getUserById = (userid) => {
  try {
    const user = userModel.find({ id: userid });
    return user || null;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

module.exports = {
  createUser,
  getUserById,
};
