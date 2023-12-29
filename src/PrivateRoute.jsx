// import React, { useEffect } from "react";
// import { Route, useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const { isAuthenticated, user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("PrivateRoute - isAuthenticated:", isAuthenticated);
//     console.log("PrivateRoute - user:", user);

//     if (!isAuthenticated) {
//       // Redirect to the login page
//       navigate("/", { replace: true });
//     } else if (user) {
//       // Redirect based on userType
//       if (user.userType === "user") {
//         navigate("/home", { replace: true });
//       } else if (user.userType === "provider") {
//         navigate("/provider", { replace: true });
//       }
//     }
//   }, [isAuthenticated, user, navigate]);

//   return isAuthenticated ? <Route {...rest} element={<Component />} /> : null;
// };

// export default PrivateRoute; // Make sure to export as default here
