import React, { useEffect, useState } from "react";
import "./Card.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Card = ({ sortOption, userEvents }) => {
  const [eventDataList, setEventDataList] = useState(userEvents);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState("30");


  const [editFormData, setEditFormData] = useState({
    nameEvent: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    price: "",
    duration: "30",
  });

  const storedData = JSON.parse(localStorage.getItem("loginData"));
  const userType = storedData ? storedData.userType : null;

  useEffect(() => {
    if (userType === "user") {
      const eventDataFromLocalStorage = JSON.parse(
        localStorage.getItem("eventData")
      );
      setEventDataList(eventDataFromLocalStorage);
    } else {
      setEventDataList(userEvents);
    }
  }, [userType, userEvents]);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditFormData(eventDataList[index]);
  };

  const handleSaveEdit = () => {
    const startTimeDate = new Date(
      `${editFormData.date} ${editFormData.startTime}`
    );
    const endTimeDate = new Date(
      `${editFormData.date} ${editFormData.endTime}`
    );

    if (endTimeDate <= startTimeDate) {
      toast.error("End time must be later than start time");
      return;
    }

    const updatedEventDataList = [...eventDataList];
    updatedEventDataList[editIndex] = { ...editFormData };
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

  const sortEventData = (dataToSort) => {
    if (!dataToSort || !Array.isArray(dataToSort)) {
      return [];
    }

    switch (sortOption) {
      case "price":
        return dataToSort.sort((a, b) => a.price - b.price);
      case "duration":
        return dataToSort.sort(
          (a, b) =>
            new Date(`2023-01-01T${a.endTime}:00`) -
            new Date(`2023-01-01T${b.endTime}:00`)
        );
      case "date":
        return dataToSort.sort((a, b) => new Date(a.date) - new Date(b.date));
      default:
        return dataToSort;
    }
  };

  const sortedEventDataList = sortEventData(eventDataList);

  return (
    <div className="card-container">
      {sortedEventDataList.length === 0 ? (
        <p>No events to display</p>
      ) : (
        sortedEventDataList.map((eventData, index) => (
          <div key={index} className="Card">
            <img src={eventData.ImgSRC} alt="" />
            <div className="description">
              <div className="description-left">
                <h2>{eventData.nameEvent}</h2>
                <p>{eventData.description}</p>
                <p className="rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </p>
              </div>
              <div className="dateTime">
                <h4>{eventData.date}</h4>
                <h5>
                  {eventData.startTime}-{eventData.endTime}
                </h5>
                <h5>Duration: {eventData.duration}</h5>
                <h3>${eventData.price}</h3>
                {userType === "user" ? (
                  <button>
                    {" "}
                    <Link
                      style={{ color: "#fff" }}
                      to={`/detail/${eventData.id}`}
                    >
                      Buy
                    </Link>
                  </button>
                ) : (
                  <>
                    {editIndex === index ? (
                      <>
                        <input
                          type="text"
                          name="ImgSRC"
                          placeholder="Image Source"
                          value={editFormData.ImgSRC}
                          onChange={handleChange}
                        />
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
                          type="date"
                          name="date"
                          value={editFormData.date}
                          onChange={handleChange}
                        />
                        <input
                          type="time"
                          name="startTime"
                          value={editFormData.startTime}
                          onChange={handleChange}
                        />
                        <input
                          type="time"
                          name="endTime"
                          value={editFormData.endTime}
                          onChange={handleChange}
                        />
                        <select
                          name="duration"
                          id="duration"
                          value={selectedDuration}
                          onChange={(e) => {
                            setSelectedDuration(e.target.value);
                            setEditFormData({
                              ...editFormData,
                              duration: e.target.value,
                            });
                          }}
                        >
                          <option value="30">30 min</option>
                          <option value="60">1 hour</option>
                          <option value="90">1 hour 30 min</option>
                          <option value="120">2 hour </option>
                        </select>
                        <input
                          type="number"
                          name="price"
                          value={editFormData.price}
                          onChange={handleChange}
                        />
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={() => setEditIndex(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(index)}>Edit</button>
                        <Link to={`/editEvent/${eventData.id}`}>Edit</Link>
                        <button onClick={() => handleDelete(index)}>
                          Delete
                        </button>
                        <Link to={`/detail/${eventData.id}`}>Detail</Link>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Card;
