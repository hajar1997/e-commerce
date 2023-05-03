import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MyProfile from "./MyProfile";

const Profile = () => {
  return (
    <div className="profile_">
      <Header />
      <MyProfile />
      <Footer />
    </div>
  );
};

export default Profile;
