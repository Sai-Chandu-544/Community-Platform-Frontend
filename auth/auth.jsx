import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  // const [userId,setUserId]=useState("")


  //  Load token from localStorage on first load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (token,user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("User",user);
    // localStorage.setItem("UserId",userId)
    setToken(token);
   
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    localStorage.removeItem("UserId");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
