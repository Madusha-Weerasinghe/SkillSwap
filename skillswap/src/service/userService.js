import axiosInstance from "../api/axios";

export const getUser = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.get(`user/get-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async (id) => {
  const token = localStorage.getItem("token");

  console.log(token);

  try {
    const response = await axiosInstance.get(`user/get-userbyid/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
