import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import UserSelect from "./components/Signup/UserSelect/UserSelect";
import AttendeeSignup from "./components/Signup/Attendee/AttendeeSignup";
import EmailVerify from "./components/Signup/EmailVerify/EmailVerify";
import Dashboard from "./components/Dashboard/Dashboard";
import Test from "./components/Test/Test";
import Admin from "./components/Admin/Admin";
import Missing from "./components/Missing/Missing";
import { AuthProvider } from "./contexts/AuthContext";
import AttendeeDashboard from "./components/Attendee/Dashboard/AttendeeDashboard";
import OrganizerDashboard from "./components/Dashboard/Organizer/Dashboard";
import AttendeeGroups from "./components/Attendee/Groups/Groups";
import AttendeeEvents from "./components/Attendee/Events/Events";
import AttendeeNotifications from "./components/Attendee/Notifications/Notifications";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/login" exact Component={Login} />
            <Route path="/signup" exact Component={UserSelect} />
            <Route path="/attendee-signup" exact Component={AttendeeSignup} />
            <Route
              path="/api/users/:id/verify/:token"
              exact
              Component={EmailVerify}
            />
            <Route path="/attendee/groups" exact Component={AttendeeGroups} />
            <Route path="/attendee/events" exact Component={AttendeeEvents} />
            <Route
              path="/attendee/notifications"
              exact
              Component={AttendeeNotifications}
            />
            <Route path="/dashboard" exact Component={Dashboard} />
            <Route
              path="/organizer-dashboard"
              exact
              Component={OrganizerDashboard}
            />
            <Route
              path="/attendee/dashboard"
              exact
              Component={AttendeeDashboard}
            />
            <Route path="/admin" exact Component={Admin} />
            <Route path="/test" exact Component={Test} />

            {/* Catch 404 Routing */}
            <Route path="*" exact Component={Missing} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
