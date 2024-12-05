import { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, getUserProfile, setRememberMe } from "../../features/login/login";
import "./SignIn.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, token } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile()).then(() => {
        navigate("/user", { replace: true });
      });
    }
  }, [token, navigate, dispatch]);

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (e.target.id === "rememberMe") {
      dispatch(setRememberMe(value));
    }

    setCredentials({
      ...credentials,
      [e.target.id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(credentials));
    if (!result.error) {
      await dispatch(getUserProfile());
    }
  };

  return (
    <div className="sign-in-container">
      <div>
        <Header />
      </div>

      <main className="main bg-dark">
        <section className="sign-in-content">
          <FaUserCircle className="sign-in-icon" />
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Username</label>
              <input type="text" id="email" value={credentials.email} onChange={handleChange} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={credentials.password} onChange={handleChange} />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="rememberMe" checked={credentials.rememberMe} onChange={handleChange} />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="sign-in-button" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign In"}
            </button>
          </form>
        </section>
      </main>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default SignIn;
