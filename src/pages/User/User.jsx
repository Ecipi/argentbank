import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./User.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { updateUsername } from "../../features/edit/edit";
import { getUserProfile } from "../../features/login/login";
import AccountSection from "../../components/AccountSection/AccountSection";
import EditButton from "../../components/EditButton/EditButton";
import InputWrapper from "../../components/InputWrapper/InputWrapper";

const User = () => {
  const { userProfile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
    setNewUsername(userProfile?.body?.userName || "");
  };

  const handleSave = async () => {
    await dispatch(updateUsername(newUsername));
    await dispatch(getUserProfile());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewUsername("");
  };

  if (!userProfile) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="user-container">
      <Header />

      <main className="main bg-dark">
        <div className="header">
          <h1>
            {!isEditing ? (
              <>
                Welcome back
                <br />
                {userProfile?.body?.firstName || ""} {userProfile.body.lastName || ""}!
              </>
            ) : (
              "Edit user info"
            )}
          </h1>
          {!isEditing ? (
            <EditButton onClick={handleEdit}>Edit Name</EditButton>
          ) : (
            <div className="edit-form">
              <InputWrapper label="User name:" id="username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
              <InputWrapper label="First name:" id="firstname" value={userProfile.body.firstName} disabled />
              <InputWrapper label="Last name:" id="lastname" value={userProfile.body.lastName} disabled />
              <div className="button-wrapper">
                <EditButton onClick={handleSave}>Save</EditButton>
                <EditButton onClick={handleCancel}>Cancel</EditButton>
              </div>
            </div>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <AccountSection accountTitle="Argent Bank Checking (x8349)" accountAmount="$2,082.79" description="Available Balance" />
        <AccountSection accountTitle="Argent Bank Savings (x6712)" accountAmount="$10,928.42" description="Available Balance" />
        <AccountSection accountTitle="Argent Bank Credit Card (x8349)" accountAmount="$184.30" description="Current Balance" />
      </main>

      <Footer />
    </div>
  );
};

export default User;
