import axios from "axios";

export const getUserInfo = async (accessToken: string) => {
  const userInfo = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return userInfo;
};
