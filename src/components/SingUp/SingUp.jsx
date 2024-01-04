import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    Cpassword: "",
    userType: "user",
  });

  const [userIdCounter, setUserIdCounter] = useState(1);

  useEffect(() => {
    const storedUserIdCounter = localStorage.getItem("userIdCounter");
    if (storedUserIdCounter) {
      setUserIdCounter(parseInt(storedUserIdCounter));
    }
  }, []);

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

    const { name, email, password, Cpassword, id } = formData;

    const existingDataJSON = localStorage.getItem("formData");
    let existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

    const isUserExists = existingData.some((user) => user.email === email);

    if (isUserExists) {
      toast.error("User with the same email already exists");
      return;
    }

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !Cpassword.trim()
    ) {
      toast.warn("Please fill in all fields");
    }
    // else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    //   toast.error("Invalid email format");
    // } else if (
    //   password.length < 8 ||
    //   !/[A-Z]/.test(password) ||
    //   !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    // ) {
    //   toast.error(
    //     "Password must be 8+ chars, contain 1 capital letter, and 1 special character"
    //   );
    // }
    else if (password !== Cpassword) {
      toast.error("Passwords do not match");
    } else {
      toast.success("Data submitted successfully. Now, login");
      navigate("/");

      const newFormData = { ...formData };
      newFormData.id = userIdCounter;

      if (!Array.isArray(existingData)) {
        existingData = [existingData];
      }

      existingData.push(newFormData);
      localStorage.setItem("formData", JSON.stringify(existingData));

      setUserIdCounter((prevUserIdCounter) => prevUserIdCounter + 1);
      localStorage.setItem("userIdCounter", String(userIdCounter + 1));
    }
  };

  return (
    <div className="Login">
      <form>
        <h2>Singup Here</h2>
        <label htmlFor="name">Enter Your name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Enter Your email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="userProvider">
          <label>
            User
            <input
              type="radio"
              name="userType"
              value="user"
              checked={formData.userType === "user"}
              onChange={handleChange}
            />
          </label>
          <label>
            Provider
            <input
              type="radio"
              name="userType"
              value="provider"
              checked={formData.userType === "provider"}
              onChange={handleChange}
            />
          </label>
        </div>
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="Cpassword">Confirm Password</label>
        <input
          id="Cpassword"
          type="password"
          name="Cpassword"
          value={formData.Cpassword}
          onChange={handleChange}
        />
        <button onClick={handleClick}>Submit</button>
        <div>
          Already have an Account? <Link to="/">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
