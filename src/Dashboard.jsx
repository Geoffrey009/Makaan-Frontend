import { useEffect, useState, useRef } from "react";
import { Header } from "./header/Header";
import defaultProfilePicture from "./assets/no-picture.jpg";
import axios from "axios";
import { io } from "socket.io-client";

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select an image first.");
    if (!user) return alert("User not loaded.");

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("profilePicture", selectedFile);
      const token = sessionStorage.getItem("token");

      const res = await axios.post(
        "https://makaan-real-estate.onrender.com/api/users/upload-profile",
        formData,
        { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } }
      );

      if (res.data.imageUrl) {
        const updatedUser = { ...user, profilePicture: res.data.imageUrl };
        setUser(updatedUser);
        sessionStorage.setItem("user", JSON.stringify(updatedUser));

        // Emit to all devices
        socketRef.current?.emit("profilePictureUpdated", {
          userId: user._id,
          imageUrl: res.data.imageUrl,
        });

        alert("Profile picture updated!");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert(err.response?.data?.message || "Failed to upload image. Try again.");
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await fetch(
        `https://makaan-real-estate.onrender.com/api/users/search?name=${query}`
      );
      const data = await res.json();
      setResults(data.users);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <div style={{ position: "absolute", top: "300px" }}>
        <h1>Dashboard</h1>

        {user ? (
          <>
            <h2>
              Hello {user.fullName || user.name} {user.isAdmin ? "(Admin)" : ""} 👋
            </h2>

            <div style={{ marginTop: "15px" }}>
              <img
                src={user.profilePicture || defaultProfilePicture}
                alt="Profile"
                style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover" }}
              />
            </div>

            <div style={{ marginTop: "20px" }}>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Profile Picture"}
              </button>
            </div>
          </>
        ) : (
          <h2>Hello Guest</h2>
        )}

        {user?.isAdmin && totalUsers !== null && <p>Total registered users: {totalUsers}</p>}

        <input
          type="text"
          placeholder="Search by full name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <div>
          {results.map((u) => (
            <div key={u._id}>
              <img src={u.profilePicture || "/default.png"} alt={u.fullName} width={50} />
              <span>{u.fullName}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
