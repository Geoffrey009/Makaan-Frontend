import { useEffect, useState, useRef } from "react";
import { Header } from "./header/Header";
import defaultProfilePicture from "./assets/no-picture.jpg";
import axios from "axios";
import { io } from "socket.io-client";
import { MdOutlineSettings, MdOutlineHouse, MdOutlineEmail, MdOutlineMarkEmailUnread } from "react-icons/md";
import { FaUsers, FaUserEdit } from "react-icons/fa";
import { Account } from "./account/Account";
import { Users } from "./users/Users";

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);

  const socketRef = useRef(null);

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

  return (
    <>
      <Header />
      <div className="dashboard">
        <h1>Dashboard</h1>

        {user ? (
          <>
            <h2>
              Hello {user.fullName || user.name} {user.isAdmin ? "(Admin)" : ""} 👋
            </h2>

          <Account user={user} setUser={setUser} socketRef={socketRef} />
          </>
        ) : (
          <h2>Hello Guest</h2>
        )}

        {user?.isAdmin && totalUsers !== null && <p>Total registered users: {totalUsers}</p>}

        {isAdmin && <Users />}
      </div>
    </>
  );
};
