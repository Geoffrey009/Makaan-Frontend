import { useEffect, useState, useRef } from "react";
import { Header } from "../header/Header";
import defaultProfilePicture from "../assets/no-picture.jpg";
import axios from "axios";
import { io } from "socket.io-client";
import { MdOutlineSettings, MdOutlineHouse, MdOutlineEmail, MdOutlineMarkEmailUnread, MdAdminPanelSettings } from "react-icons/md";
import { FaUsers, FaUserEdit } from "react-icons/fa";
import { Account } from "../account/Account";
import { Users } from "../users/Users";
import { General } from "../general/General";
import "./Dashboard.css"

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [isClicked, setIsClicked] = useState(true);
  const [isGeneral, setIsGeneral] = useState(true);
  const [isProperties, setIsProperties] = useState(false);
  const [isUsers, setIsUsers] = useState(false);
  const [isRequests, setIsRequests] = useState(false);
  const [isAccount, setIsAccount] = useState(false);
  const [isArrowClicked, setIsArrowClicked] = useState(false);

  const socketRef = useRef(null);

  function showGeneral() {
    isProperties && setIsProperties(false);
    isUsers && setIsUsers(false);
    isRequests && setIsRequests(false);
    isAccount && setIsAccount(false);
    isGeneral == false && setIsGeneral(true);
  };

  function showProperties() {
    isGeneral && setIsGeneral(false);
    isUsers && setIsUsers(false);
    isRequests && setIsRequests(false);
    isAccount && setIsAccount(false);
    isProperties == false && setIsProperties(true);
  };

  function showUsers() {
    isGeneral && setIsGeneral(false);
    isProperties && setIsProperties(false);
    isRequests && setIsRequests(false);
    isAccount && setIsAccount(false);
    isUsers == false && setIsUsers(true);
  };

  function showRequests() {
    isGeneral && setIsGeneral(false);
    isProperties && setIsProperties(false);
    isUsers && setIsUsers(false);
    isAccount && setIsAccount(false);
    isRequests == false && setIsRequests(true);
  };
  
  function showAccount() {
    isGeneral && setIsGeneral(false);
    isProperties && setIsProperties(false);
    isUsers && setIsUsers(false);
    isRequests && setIsRequests(false);
    isAccount == false && setIsAccount(true);
  };

  // const [isGeneral, setIsGeneral] = useState(true);
  // const [isProperties, setIsProperties] = useState(true);
  // const [isUsers, setIsUsers] = useState(true);
  // const [isRequests, setIsRequests] = useState(true);
  // const [isAccount, setIsAccount] = useState(true);

  // Load user, fetch latest from backend, and initialize socket
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) return;

    const parsedUser = JSON.parse(storedUser);
    const user_Id = parsedUser._id;

    // ✅ Fetch the latest user data from backend
    const fetchLatestUser = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get(
          `https://makaan-real-estate.onrender.com/api/users/${user_Id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const latestUser = res.data;
        setUser(latestUser);
        sessionStorage.setItem("user", JSON.stringify(latestUser));
      } catch (err) {
        console.error("Failed to fetch latest user:", err);
        setUser(parsedUser); // fallback to stored user
      }
    };

    fetchLatestUser();

    // Initialize socket connection
    socketRef.current = io("https://makaan-real-estate.onrender.com", {
      query: { userId: user_Id },
    });

    // Admin: fetch total users
    if (parsedUser.isAdmin) {
      axios
        .get("https://makaan-real-estate.onrender.com/api/users/count")
        .then((res) => setTotalUsers(res.data.totalUsers))
        .catch((err) => console.error("Error fetching total users:", err));
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Real-time listeners
  useEffect(() => {
    if (!user || !socketRef.current) return;

    const socket = socketRef.current;

    const profileHandler = (newImageUrl) => {
      const updatedUser = { ...user, profilePicture: newImageUrl };
      setUser(updatedUser);
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
    };
    socket.on(`updateProfilePicture-${user._id}`, profileHandler);

    const totalUsersHandler = (newTotal) => {
      if (user.isAdmin) setTotalUsers(newTotal);
    };
    socket.on("totalUsersUpdated", totalUsersHandler);

    return () => {
      socket.off(`updateProfilePicture-${user._id}`, profileHandler);
      socket.off("totalUsersUpdated", totalUsersHandler);
    };
  }, [user]);

  const storedUserTwo = sessionStorage.getItem("user");
  const parsedUserTwo = JSON.parse(storedUserTwo);
  const isAdmin = parsedUserTwo.isAdmin;

  const showPanel = () => {
    setIsClicked((prev) => !prev)
    setIsArrowClicked((prev) => !prev);
  }

  const userGeneral = user && isGeneral;
  const userProperties = user && isProperties;
  const userUsers = user && isUsers;
  const userRequests = user && isRequests;
  const userAccount = user && isAccount;

  return (
    <>
      <Header />
      {/* <div className="dashboard" style={{height: "200vh"}}>
        <h1>Dashboard</h1>

        {user ? (
          <>
          <General user={user} totalUsers={totalUsers} />

          <Account user={user} setUser={setUser} socketRef={socketRef} />
          </>
        ) : (
          <h2>Hello Guest</h2>
        )}

        {isAdmin && <Users />}
      </div> */}

      <div className="dashboard">
        <div className={`dashboard-panel ${isClicked ? "show" : "hide"}`}>
          <div className={`arrow-toggle ${isClicked ? "arrow-left" : "arrow-right"}`} onClick={showPanel}>
            <div className="bar bar1"></div>
            <div className="bar bar2"></div>
            <div className="bar bar3"></div>
          </div>

          <div className={`panel-picture-wrapper ${isArrowClicked ? "none" : ""}`}>
            <img className="panel-picture" src={user?.profilePicture || defaultProfilePicture} alt="" />
            <p className="panel-username">
              {user
                ? `${user.fullName}${user.isAdmin ? " (Admin)" : ""}`
                : "Guest"}
            </p>

          </div>

          <div className={`panel-tabs ${isArrowClicked ? "none" : ""}`}>
            <div className={`general-tab ${isGeneral ? "border-left" : ""}`} onClick={showGeneral}>
              <span>
                <MdOutlineSettings className="general-icon" size={27} style={{ color: "white" }} /> <p>General</p>
              </span>
            </div>
            <div className={`properties-tab ${isProperties ? "border-left" : ""}`} onClick={showProperties}>
              <span>
                <MdOutlineHouse className="general-icon" size={27} style={{ color: "white" }} /> <p>Properties</p>
              </span>
            </div>
            <div className={`users-tab ${isUsers ? "border-left" : ""}`} onClick={showUsers}>
              <span>
                <FaUsers className="general-icon" size={27} style={{ color: "white" }} /> <p>Users</p>
              </span>
            </div>
            <div className={`requests-tab ${isRequests ? "border-left" : ""}`} onClick={showRequests}>
              <span>
                <MdOutlineEmail className="general-icon" size={27} style={{ color: "white" }} /> <p>Requests</p>
              </span>
            </div>
            <div className={`account-tab ${isAccount ? "border-left" : ""}`} onClick={showAccount}>
              <span>
                <FaUserEdit className="general-icon" size={27} style={{ color: "white" }} /> <p>Account</p>
              </span>
            </div>
          </div>

        </div>
        <div className="dashboard-content">
          {userGeneral && <General user={user} totalUsers={totalUsers} />}
          {userAccount && <Account user={user} setUser={setUser} socketRef={socketRef} />}
        </div>
      </div>
    </>
  );
};
