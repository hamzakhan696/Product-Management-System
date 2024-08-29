// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { BASE_URL } from "./constants";
// import Loader from "../components/loader/loader";

// function ProtectedRoute({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         await axios(`${BASE_URL}auth/verify`, { withCredentials: false });
//         setIsAuthenticated(false);
//       } catch (e) {
//         setIsAuthenticated(false);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     verifyUser();
//   }, []);
//   if (isLoading) return <Loader />;

//   return isAuthenticated ? children : <Navigate to={"/"} />;
// }
// export default ProtectedRoute;
