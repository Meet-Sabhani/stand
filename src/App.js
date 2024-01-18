// App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Provider from "./components/Provider/Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./components/SingUp/SingUp";
import Error from "./components/404 Error/Error";
import AddEvent from "./components/Provider/AddEvent";
import Bookings from "./components/Bookings/Bookings";
import Detail from "./components/Detail/Detail";
import EditEvent from "./components/Card/EditEvent";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/provider" element={<Provider />} />
        <Route path="/addEvent" element={<AddEvent />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/detail/:productId" element={<Detail />} />
        <Route path="/editEvent/:id" element={<EditEvent />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
