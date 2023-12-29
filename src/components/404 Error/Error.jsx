import React from "react";
import "./error.css";
import img from "./Errors.jpg";

const Error = () => {
  return (
    <div id="error">
      <img src={img} alt="404 | Error Page Not Found" />
    </div>
  );
};

export default Error;
