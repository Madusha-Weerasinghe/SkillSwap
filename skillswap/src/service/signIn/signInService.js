import axiosInstance from "../../api/axios";

export const signin = async (email, password) => {
  try {
    const response = await axiosInstance.post(`login`, {
      email: email,
      password: password,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const signUp = async (
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
    const response = await axiosInstance.post(`signUp`, {
      name: name,
      password: password,
      email: email,
      age: Number(age),
      country: country,
      skils: skils,
      followers: followers,
      following: following,
      gender: gender,
      imageURL: imageURL,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
