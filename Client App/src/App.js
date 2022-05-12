import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import { UserContextProvider } from "./services/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileEditor from "./Pages/ProfileEditor/ProfileEditor";
const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="Login" element={<Login />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/MyProfile" element={<ProfileEditor />} />
        </Route>
        <Route path="*" element={<div>not found</div>} />
      </Routes>
    </UserContextProvider>
  );
};

export default App;
