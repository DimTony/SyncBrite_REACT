import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import UserSelect from "./components/Signup/UserSelect/UserSelect";
import AttendeeSignup from "./components/Signup/Attendee/AttendeeSignup";
import EmailVerify from "./components/Signup/EmailVerify/EmailVerify";
import Dashboard from "./components/Dashboard/Dashboard";
import LoginTest from "./components/Test/LoginTest";
import HeroThree from "./components/Test/RegTest";
import Secret, { HeroOne } from "./components/Test/Secret";
import Admin from "./components/Admin/Admin";
import Missing from "./components/Missing/Missing";
// import { AuthProvider } from "./context/AuthContext";
import AttendeeDashboard from "./components/Attendee/Dashboard/Main";
import OrganizerDashboard from "./components/Dashboard/Organizer/Dashboard";
import AttendeeGroups from "./components/Attendee/Groups/Groups";
import AttendeeEvents from "./components/Attendee/Events/Events";
import AttendeeNotifications from "./components/Attendee/Notifications/Notifications";
import AttendeeProfile from "./components/Attendee/Profile/Dashboard/Profile";
import TimedOut from "./components/TimedOut/TimedOut";
import EditProfileModal from "./components/Attendee/Profile/Edit/EditProfile";
import Friends from "./components/Attendee/Profile/Friends/Friends";
import Groups from "./components/Attendee/Profile/Groups/Groups";
import Events from "./components/Attendee/Profile/Events/Events";
import Likes from "./components/Attendee/Profile/Likes/Likes";
import Photos from "./components/Attendee/Profile/Photos/Photos";
import Videos from "./components/Attendee/Profile/Videos/Videos";
import Support from "./components/Attendee/Profile/Support/Support";
import SingleEvent from "./components/Attendee/Events/RightBar/SingleEvent/SingleEvent";
import AllMyEvents from "./components/Attendee/Events/RightBar/MyEvents/AllMyEvents/AllMyEvents";
import CreateGroup from "./components/Attendee/Groups/Create/CreateGroup.js";
import SingleGroup from "./components/Attendee/Groups/SingleGroup/SingleGroup";
import ComingSoon from "./components/CominSoon/ComingSoon.js";
import Signup from "./components/Signup/Attendee/SignUp.js";
// import ContextProvider from "./context/ContextProvider";

function App() {
  return (
    <>
      <Router>
        {/* <AuthProvider> */}
        {/* <ContextProvider> */}
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/login" exact Component={Login} />

          {/* SignUp Onboarding*/}
          <Route path="/signup" exact Component={UserSelect} />
          <Route path="/attendee-signup" exact Component={Signup} />
          <Route
            path="/api/users/:id/verify/:token"
            exact
            Component={EmailVerify}
          />

          <Route path="/dashboard" exact Component={Dashboard} />
          <Route path="/organizer-dashboard" exact Component={ComingSoon} />
          {/* Attendee Routing Start*/}
          <Route
            path="/attendee/dashboard"
            exact
            Component={AttendeeDashboard}
          />
          <Route path="/attendee/groups" exact Component={ComingSoon} />
          <Route path="/attendee/groups/create" exact Component={ComingSoon} />
          <Route
            path="/attendee/groups/:groupId"
            exact
            Component={ComingSoon}
          />
          <Route
            path="/attendee/groups/posts/:postId"
            exact
            Component={ComingSoon}
          />

          <Route path="/attendee/events" exact Component={AttendeeEvents} />
          <Route
            path="/attendee/:username/events"
            exact
            Component={AllMyEvents}
          />
          <Route
            path="/attendee/events/:eventId"
            exact
            Component={SingleEvent}
          />
          <Route
            path="/attendee/events/posts/:postId"
            exact
            Component={ComingSoon}
          />
          <Route path="/attendee/notifications" exact Component={ComingSoon} />
          <Route path="/profile/:username" exact Component={AttendeeProfile} />
          <Route
            path="/profile/:username/friends"
            exact
            Component={ComingSoon}
          />
          <Route
            path="/profile/:username/groups"
            exact
            Component={ComingSoon}
          />
          <Route
            path="/profile/:username/events"
            exact
            Component={ComingSoon}
          />
          <Route path="/profile/:username/likes" exact Component={ComingSoon} />
          <Route
            path="/profile/:username/photos"
            exact
            Component={ComingSoon}
          />
          <Route
            path="/profile/:username/videos"
            exact
            Component={ComingSoon}
          />
          <Route
            path="/profile/:username/support"
            exact
            Component={ComingSoon}
          />

          {/* Attendee Routing End*/}

          {/* Test Routing */}
          <Route path="/secret1" exact Component={ComingSoon} />
          <Route path="/secret" exact Component={HeroThree} />
          <Route path="/login-test" exact Component={LoginTest} />
          <Route path="/t3" exact Component={Signup} />

          {/* Catch 404 Routing */}
          <Route path="*" exact Component={Missing} />
          <Route path="/timed-out" exact Component={TimedOut} />
        </Routes>
        {/* </ContextProvider> */}
        {/* </AuthProvider> */}
      </Router>
    </>
  );
}

export default App;
