import { useState } from "react";
import axios from "axios";
import defaultProfilePicture from "../assets/no-picture.jpg";
import "./Account.css"

export const Account = ({ user, setUser, socketRef }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

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

                // notify all devices via socket
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

    return (
        <div className="account">
            <div style={{ marginTop: "15px" }}>
                <img
                    src={user.profilePicture || defaultProfilePicture}
                    alt="Profile"
                    style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover" }}
                />
            </div>

            <div style={{ marginTop: "20px" }}>
                <input
                    id="fileUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />

                <button
                    type="button"
                    onClick={() => document.getElementById("fileUpload").click()}
                    disabled={uploading}
                >
                    {selectedFile ? "Change Picture" : "Choose Picture"}
                </button>

                <button
                    onClick={handleUpload}
                    disabled={uploading || !selectedFile}
                    style={{ marginLeft: "10px" }}
                >
                    {uploading ? "Uploading..." : "Upload"}
                </button>
            </div>
        </div>
    );
}