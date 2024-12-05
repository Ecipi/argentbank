import { Link, useNavigate } from "react-router-dom";
import argentBankLogo from "../../assets/img/argentBankLogo.avif";
import { FaUserCircle } from "react-icons/fa";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/login/login";

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { userProfile } = useSelector((state) => state.auth);

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/sign-in");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="main-nav-item-container">
        {userProfile?.body?.userName && (
          <Link to="/user">
            <p className="main-nav-item-username">{userProfile.body.userName}</p>
          </Link>
        )}
        <Link className="main-nav-item" to={token ? "/" : "/sign-in"} onClick={token ? handleSignOut : undefined}>
          <FaUserCircle />
          {token ? "Sign Out" : "Sign In"}
        </Link>
      </div>
    </nav>
  );
};

export default Header;
