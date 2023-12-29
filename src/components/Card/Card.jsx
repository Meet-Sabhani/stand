import React, { useEffect, useState } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const [eventDataList, setEventDataList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    nameEvent: "",
    description: "",
    date: "",
    time: "",
    price: "",
  });


  useEffect(() => {
    const eventDataFromLocalStorage = JSON.parse(
      localStorage.getItem("eventData")
    );

    if (Array.isArray(eventDataFromLocalStorage)) {
      setEventDataList(eventDataFromLocalStorage);
    }
  }, []);

  // Retrieve user type from local storage
  const storedData = localStorage.getItem("formData");
  const storedFormData = JSON.parse(storedData);
  const { userType } = storedFormData;

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditFormData(eventDataList[index]);
  };

  const handleSaveEdit = () => {
    const updatedEventDataList = [...eventDataList];
    updatedEventDataList[editIndex] = editFormData;
    setEventDataList(updatedEventDataList);
    localStorage.setItem("eventData", JSON.stringify(updatedEventDataList));
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updatedEventDataList = [...eventDataList];
    updatedEventDataList.splice(index, 1);
    setEventDataList(updatedEventDataList);
    localStorage.setItem("eventData", JSON.stringify(updatedEventDataList));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  return (
    <div className="cards">
      {eventDataList.map((eventData, index) => (
        <div key={index} className="Card">
          <img src={eventData.ImgSRC} alt="" />
          <div className="description">
            <div>
              <h1>{eventData.nameEvent}</h1>
              <p>{eventData.description}</p>
              <p className="rating">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </p>
            </div>
            <div className="dateTime">
              <h5>{eventData.date}</h5>
              <h5>{eventData.time}</h5>
              <h3>{eventData.price}</h3>
              {userType === "user" ? (
                <button>Buy</button>
              ) : (
                <>
                  {editIndex === index ? (
                    <>
                      <input
                        type="text"
                        name="nameEvent"
                        value={editFormData.nameEvent}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="description"
                        value={editFormData.description}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="date"
                        value={editFormData.date}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="time"
                        value={editFormData.time}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="price"
                        value={editFormData.price}
                        onChange={handleChange}
                      />
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={() => setEditIndex(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
