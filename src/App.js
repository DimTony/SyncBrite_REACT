import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import UserSelect from "./components/Signup/UserSelect/UserSelect";
import AttendeeSignup from "./components/Signup/Attendee/AttendeeSignup";
import EmailVerify from "./components/Signup/EmailVerify/EmailVerify";
import Test from "./components/Test/Test";
import Admin from "./components/Admin/Admin";
import Missing from "./components/Missing/Missing";
import { AuthProvider } from "./contexts/AuthContext";
import Attendee from "./components/Attendee/Attendee";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<UserSelect />} />
            <Route path="/attendee-signup" element={<AttendeeSignup />} />
            <Route
              path="/api/users/:id/verify/:token"
              element={<EmailVerify />}
            />

            <Route path="/admin" element={<Admin />} />
            <Route path="/test" element={<Test />} />

            {/* Catch 404 Routing */}
            <Route path="*" element={<Missing />} />

            {/* Testing MultiRouting*/}
            <Route
              path="/attendee/dashboard/*"
              element={<Attendee activeRoute="dashboard" />}
            />
            <Route
              path="/attendee/events/*"
              element={<Attendee activeRoute="events" />}
            />
            <Route
              path="/attendee/groups/*"
              element={<Attendee activeRoute="groups" />}
            />
            <Route
              path="/attendee/notifications/*"
              element={<Attendee activeRoute="notifications" />}
            />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
