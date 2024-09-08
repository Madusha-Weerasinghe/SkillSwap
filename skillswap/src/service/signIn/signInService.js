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
