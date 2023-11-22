import React from "react";
import { Routes, Route } from "react-router-dom";
import AttendeeNavbar from "./components/Attendee/Navbar/AttendeeNavbar";
import Main from "./components/Attendee/Dashboard/Main";
import Event from "./components/Attendee/Events/Events";
import Groups from "./components/Attendee/Groups/Groups";
import Notifications from "./components/Attendee/Notifications/Notifications";

const AttendeeApp = () => {
  return (
    <>
      <AttendeeNavbar />
      <Routes>
        <Route path="/attendee/dashboard" component={Main} />
        <Route path="/attendee/groups" component={Groups} />
        <Route path="/attendee/events" component={Event} />
        <Route path="/attendee/notifications" component={Notifications} />
      </Routes>
    </>
  );
};

export default AttendeeApp;
