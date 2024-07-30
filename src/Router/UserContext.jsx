// UserContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await fetch(
            "https://api.htilssu.com/api/v1/auth/user",
            {
              method: "POST",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          setUser(data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, [token]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export { UserContext };
