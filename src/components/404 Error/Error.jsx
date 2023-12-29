import React from "react";
import "./error.css";
import img from "./404 Error.png";

const Error = () => {
  return (
    <div className="Error">
      <img src={img} alt="404 | Error Page Not Found" />
    </div>
  );
};

export default Error;
