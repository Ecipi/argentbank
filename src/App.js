import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import User from "./pages/User/User";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./features/login/login";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile());
    }
  }, [dispatch, token]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;
