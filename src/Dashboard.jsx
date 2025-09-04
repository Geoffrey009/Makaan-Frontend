import { useEffect, useState } from "react";
import { Header } from "./header/Header";

export const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the saved user from localStorage
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // convert back to object
    }
  }, []);

  return (
    <>
      <Header />
      <div style={{ position:"absolute", top:"300px" }}>
        <h1>Dashboard</h1>
        {user ? (
          <h2>Hello {user.fullName || user.name} 👋</h2>
        ) : (
          <h2>Hello Guest</h2>
        )}
      </div>
    </>
  );
}
