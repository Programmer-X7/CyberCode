import Cookies from "js-cookie";
import useAuthStore from "../Store.js";

const loadAuthFromCookies = async () => {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const userDetails = sessionStorage.getItem("user_details")

  if (token && userId) {
    const initializeAuth = useAuthStore.getState().initializeAuth;
    await initializeAuth(token, userId, userDetails);
  }
};

export default loadAuthFromCookies;
