import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import SuperAdmin from "./SuperAdmin/SuperAdmin";

const SingleGroup = () => {
  const [renderedComponent, setRenderedComponent] = useState(null);
  const [group, setGroup] = useState(null);
  const [cookies] = useCookies([]);
  const navigate = useNavigate();

  const generateError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  useEffect(() => {
    const fetchData = async () => {
      const syncToken = cookies.SyncBriteToken;
      const url = window.location.href;
      const groupIdMatch = url.match(/\/attendee\/groups\/([^/]+)/);

      if (groupIdMatch) {
        try {
          if (!syncToken) {
            navigate("/login");
            return;
          }

          const groupId = groupIdMatch[1];

          const response = await axios.get(
            `https://syncbrite.onrender.comapi/groups/${groupId}`,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${syncToken}`,
              },
            }
          );

          if (response.status === 200) {
            const groupData = response.data.group;
            const user = response.data.user;
            const member = groupData.members.find(
              (member) => member.user === user.id
            );

            // Determine the status based on whether the user is a member of the group
            const status = member ? member.status : "guest";

            let groupComponent;

            switch (status) {
              case "admin":
                groupComponent = <AdminGroupComponent />;
                break;
              case "superAdmin":
                groupComponent = (
                  <SuperAdmin
                    user={user}
                    groupData={groupData}
                    group={groupData}
                    setGroup={setGroup}
                  />
                );
                break;
              case "suspended":
                groupComponent = <SuspendedGroupComponent />;
                break;
              case "member":
                groupComponent = <MemberGroupComponent />;
                break;
              default:
                groupComponent = <GuestComponent />;
                break;
            }

            // Set state or update UI with the appropriate component
            setRenderedComponent(groupComponent);
          } else {
            generateError(
              "Failed to authenticate the user.\n REDIRECTING TO LOGIN..."
            );
            console.error("Failed to authenticate the user");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              if (error.response.data.message === "jwt expired") {
                generateError(
                  `${error.response.data.message}, REDIRECTING TO LOGIN PAGE...`
                );
                setTimeout(() => {
                  navigate("/login");
                }, 3000);
              }

              generateError(
                `${error.response.data.message}, PLEASE TRY AGAIN LATER...`
              );
            } else if (error.request) {
              generateError("BAD REQUEST");

              console.error(
                "No response received. Request details:",
                error.request
              );
            } else {
              generateError("REQUEST SETUP ERROR");

              console.error(
                "Request setup error. Error message:",
                error.message
              );
            }
          } else {
            generateError("INTERNAL SERVER ERROR");
            console.error("Non-Axios error. Error message:", error?.message);
          }
        }
      } else {
        navigate("/attendee/dashboard");
      }
    };

    fetchData();
  }, [cookies.SyncBriteToken]);

  return (
    <div>
      {/* Render specific components based on group status */}
      {renderedComponent}
    </div>
  );
};

// Define different versions of the component based on group status
const MemberGroupComponent = () => <div>Member Group Component</div>;
const AdminGroupComponent = () => <div>Admin Group Component</div>;
const SuspendedGroupComponent = () => <div>Suspended Group Component</div>;
const GuestComponent = () => <div>Common Group Component</div>;

export default SingleGroup;
