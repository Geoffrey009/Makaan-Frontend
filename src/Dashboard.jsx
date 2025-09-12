import { useEffect, useState } from "react";
import { Header } from "./header/Header";
import defaultProfilePicture from "./assets/profile-default-svgrepo-com.svg"
import axios from "axios";

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser.isAdmin) {
        axios
          .get("https://makaan-real-estate.onrender.com/api/users/count")
          .then((res) => setTotalUsers(res.data.totalUsers))
          .catch((err) => console.error("Error fetching total users:", err));
      }
    }
  }, []);

  // ✅ Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // ✅ Upload profile picture
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("profilePicture", selectedFile); // ⚡ must match backend field name

      const token = sessionStorage.getItem("token");

      const res = await axios.post(
        "https://makaan-real-estate.onrender.com/api/users/upload-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.imageUrl) {
        // ✅ Update user in sessionStorage with new picture
        const updatedUser = { ...user, profilePicture: res.data.imageUrl };
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("Profile picture updated!");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      const msg =
        err.response?.data?.message || "Failed to upload image. Try again.";
      alert(msg);
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await fetch(`https://makaan-real-estate.onrender.com/api/users/search?name=${query}`);
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
              Hello {user.fullName || user.name}{" "}
              {user.isAdmin ? "(Admin)" : ""} 👋
            </h2>

            {/* ✅ Profile Picture Section */}
            <div style={{ marginTop: "15px" }}>
              {user?.profilePicture ? (
                <img
                  src={user?.profilePicture}
                  alt="Profile"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />

              ) : (
                <img
                  src={defaultProfilePicture}
                  alt="Profile"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>

            {/* ✅ File input + Upload button */}
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

        {user?.isAdmin && totalUsers !== null && (
          <p>Total registered users: {totalUsers}</p>
        )}

        <input
          type="text"
          placeholder="Search by full name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <div>
          {results.map((user) => (
            <div key={user._id}>
              <img src={user.profilePic || "/default.png"} alt={user.fullName} width={50} />
              <span>{user.fullName}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
