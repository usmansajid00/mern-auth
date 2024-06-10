import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/AuthContext";

import "./home.scss";

const Home = () => {
  const navigate = useNavigate();
  const { Logout } = useContext(StoreContext);

  const handleLogout = async () => {
    try {
      await Logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home_wrapper">
      <p className="heading">Welcome to our Application !</p>
      <button className="logout_btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
