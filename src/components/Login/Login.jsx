import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    const { email, password } = formData;
    console.log("FormData:", formData);
    if (!email.trim() || !password.trim()) {
      toast.warn("Please enter both email & password");
    }
    //  else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    //   alert("Invalid email format");
    //   console.error("Email validation failed");
    // } else if (
    //   password.length < 8 ||
    //   !/[A-Z]/.test(password) ||
    //   !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    // ) {
    //   toast.error("Password validation failed", {});
    // }
    else {
      const storedData = localStorage.getItem("formData");
      if (storedData) {
        const storedFormDataArray = JSON.parse(storedData);
        const userMatch = storedFormDataArray.find(
          (user) => user.email === email && user.password === password
        );

        if (userMatch) {
          console.log(userMatch);
          localStorage.setItem("setLoging", true);
          localStorage.setItem("loginData", JSON.stringify(userMatch));
          if (userMatch.userType === "user") {
            navigate("/home");
            toast.success("Login Successfully");
          } else if (userMatch.userType === "provider") {
            navigate("/provider");
            toast.success("Login Successfully");
          } else {
            toast.error(
              "Invalid email or password. Please try again or sign up"
            );
          }
        } else {
          toast.warn("Invalid email or password. Please try again or sign up");
        }
      } else {
        toast.warn("Please sign up first");
        navigate("/signUp");
      }
    }
  };

  return (
    <div className="Login">
      <form>
        <h2>Login Here</h2>
        <label htmlFor="email">Enter email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button onClick={handleClick}>Submit</button>
        <div>
          Don't have an account ?<Link to="/signUp"> SignUp</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
