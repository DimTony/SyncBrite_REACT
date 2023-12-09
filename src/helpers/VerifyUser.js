import axios from "axios";

const VerifyUser = async (navigate) => {
  const token = localStorage.getItem("token");
  const url = `http://localhost:8080/api/auth/verify/${token}`;

  try {
    const { data: res } = await axios.post(url);

    const user = {
      id: res.data.user.id,
      firstName: res.data.user.firstName,
      lastName: res.data.user.lastName,
      fullName: res.data.user.fullName,
      userName: res.data.user.userName,
      profilePic: res.data.user.profilePic,
      coverPic: res.data.user.coverPic,
      dateOfBirth: res.data.user.dateOfBirth,
      location: res.data.user.location,
      bio: res.data.user.bio,
      interests: res.data.user.interests,
      pronouns: res.data.user.pronouns,
      socialLinks: res.data.user.socialLinks,
      email: res.data.user.email,
      role: res.data.user.role,
      verified: res.data.user.verified,
    };

    return { user, isLoggedIn: true, error: null };
  } catch (error) {
    if (error?.response?.data?.message === "jwt expired") {
      localStorage.removeItem("token");
      navigate("/timed-out");
    } else if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500
    ) {
      return {
        user: null,
        isLoggedIn: false,
        error: error.response.data.message,
      };
    } else {
      navigate("/timed-out");
    }

    return {
      user: null,
      isLoggedIn: false,
      error: "An error occurred while verifying the user.",
    };
  }
};

export default VerifyUser;
