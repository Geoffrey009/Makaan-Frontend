import { useState } from "react";
import defaultProfilePicture from "../assets/no-picture.jpg";
import "./Users.css"

export const Users = () => {
    const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

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
    <div>
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
            <img
              src={u.profilePicture || defaultProfilePicture}
              alt={u.fullName}
              width={50}
            />
            <span>{u.fullName}</span>
          </div>
        ))}
      </div>
    </div>
  );

}