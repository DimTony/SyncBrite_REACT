import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";
import { FaMobile, FaMobileAlt } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { IoDesktop, IoDesktopOutline } from "react-icons/io5";
import { ImHappy } from "react-icons/im";
import { LiaUserTagSolid } from "react-icons/lia";
import axios from "axios";
import "./Create.css";
import "../../Events/Events.css";
import bannerPlaceholder from "../../../../images/create-group-placeholder.png";
import profilePicPlaceholder from "../../../../images/placeholder.png";
import AttendeeNavbar from "../../Navbar/AttendeeNavbar";
import Leftbar from "./Leftbar.js";
import Rightbar from "./Rightbar";

const CreateGroup = () => {
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies([]);
  const [groupName, setGroupName] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [groupBanner, setGroupBanner] = useState("");
  const [groupBannerURL, setGroupBannerURL] = useState(null);
  const [invites, setInvites] = useState([]);
  const [isCreateEnabled, setIsCreateEnabled] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const generateError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  useEffect(() => {
    const checkCookieAndFetchData = async () => {
      const syncToken = cookies.SyncBriteToken;

      if (syncToken) {
        try {
          const response = await axios.post(
            "https://syncbrite.onrender.com/api/auth/verify-auth",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${syncToken}`,
              },
            }
          );

          if (response.status === 200) {
            setUserData(response.data.user);
          } else {
            generateError(
              "Failed to verify the cookie.\n REDIRECTING TO LOGIN..."
            );
            console.error("Failed to verify the cookie");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          }
        } catch (error) {
          generateError(error, "REDIRECTING TO LOGIN...");
          console.error("Error fetching user data:", error);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } else {
        generateError("Server Error.\nREDIRECTING TO LOGIN...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    };

    checkCookieAndFetchData();
  }, [navigate]);

  const updateCreateButtonState = () => {
    if (groupName !== "" && privacy !== "") {
      setIsCreateEnabled(true);
    } else {
      setIsCreateEnabled(false);
    }
  };

  const handleGroupNameChange = (e) => {
    console.log("handleGroupNameChange:", e.target.value);
    setGroupName(e.target.value);
    updateCreateButtonState();
  };

  const handlePrivacyChange = (e) => {
    console.log("handlePrivacyChange:", e.target.value);
    setPrivacy(e.target.value);
    updateCreateButtonState();
  };

  const handleGroupBannerChange = (e) => {
    setGroupBanner(e);
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGroupBannerURL(reader.result);
      };
      reader.readAsDataURL(file);
      //   // You can use FileReader or any other method to handle the file
      //   // For simplicity, let's set the file name as the groupBanner value
      handleGroupBannerChange(file);
    } else {
      handleGroupBannerChange(""); // Handle the case when no file is selected
    }
  };

  const handleInvitesChange = (e) => {
    setInvites(e.target.value.split(",").map((invite) => invite.trim()));
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    setLoading(true);
    const syncToken = cookies.SyncBriteToken;

    if (groupName === "" || privacy === "") {
      generateError("Provide required group data.");
    } else {
      if (!syncToken) {
        navigate("/login");
      } else {
        try {
          const formData = new FormData();
          formData.append("groupName", groupName);
          formData.append("privacy", privacy);
          formData.append("invites", invites);
          formData.append("groupBanner", groupBanner);

          const response = await axios.post(
            "https://syncbrite.onrender.com/api/groups/create", // Replace with your actual API endpoint URL
            formData,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${cookies.SyncBriteToken}`, // Add your authentication token
                "Content-Type": "multipart/form-data",
              },
            }
          );

          // Handle the response accordingly
          if (response.status === 201) {
            toast.success(
              "Group created successfully, Please wait for redirect..."
            );
            const groupId = response.data.group._id;

            setTimeout(() => {
              navigate(`/attendee/groups/${groupId}`);
            }, 2000);
            // You can perform any additional actions or redirect the user as needed
          } else {
            generateError("Failed to submit group data.");
          }
        } catch (error) {
          generateError("Error submitting group data.");
          console.error("Error submitting group data:", error);
        }
      }
    }
  };

  console.log("Rendering with values:", groupName, privacy, isCreateEnabled);
  // console.log("vaaaaaa:", groupName !== "" && privacy !== "");

  return (
    <>
      {userData ? (
        <div className="groups_main_container">
          <AttendeeNavbar userData={userData} />

          <div className="groups_hero_container">
            <ToastContainer />
            <div className="left_createGroup">
              <Leftbar
                user={userData}
                groupName={groupName}
                privacy={privacy}
                groupBanner={groupBanner}
                invites={invites}
                isCreateEnabled={isCreateEnabled}
                handleGroupNameChange={handleGroupNameChange}
                handlePrivacyChange={handlePrivacyChange}
                handleGroupBannerChange={handleGroupBannerChange}
                handleBannerImageChange={handleBannerImageChange}
                handleInvitesChange={handleInvitesChange}
                handleCreateGroup={handleCreateGroup}
                setGroupName={setGroupName}
                setPrivacy={setPrivacy}
                setIsCreateEnabled={setIsCreateEnabled}
                groupBannerURL={groupBannerURL}
                setGroupBannerURL={setGroupBannerURL}
              />
            </div>
            <div className="righter_createGroup">
              <Rightbar
                groupBanner={groupBanner}
                groupName={groupName}
                privacy={privacy}
                groupBannerURL={groupBannerURL}
              />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ width: "100vw", height: "1oovh" }}>
          <Skeleton />
        </div>
      )}
    </>
  );
};

export default CreateGroup;
