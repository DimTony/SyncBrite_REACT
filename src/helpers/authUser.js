import axios from "axios";

const authUser = async (cookies, navigate, removeCookie) => {
  if (!cookies) {
    navigate("/login");
  } else {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/verify",
        {},
        { withCredentials: true }
      );

      if (!data.success) {
        removeCookie("SyncBriteToken");
        navigate("/login");
      } else {
        console.log(data.user);
        return data.user;
      }
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  }

  return null;
};

export default authUser;
