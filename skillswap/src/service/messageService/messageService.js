import axiosInstance from "../../api/axios";

export const getAllMessage = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.get(`chat/getMessage/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const sendMessage = async (id, message) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.post(
      `chat/send`,
      {
        receiver: id,
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
