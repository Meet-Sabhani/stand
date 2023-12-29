// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   const login = (email, password) => {
//     // Simplified authentication logic
//     if (email === "test@example.com" && password === "password") {
//       setIsAuthenticated(true);
//       setUser({ email, userType: "user" });
//       console.log("Login successful. User:", { email, userType: "user" });
//       return true;
//     } else {
//       return false;
//     }
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   console.log("AuthProvider - isAuthenticated:", isAuthenticated);
//   console.log("AuthProvider - user:", user);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
