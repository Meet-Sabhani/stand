import { toast } from "react-toastify";

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const getCurrentTime = () => {
  const today = new Date();
  return today.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const validateTime = (date, startTime, endTime, selectedDuration) => {
  const today = getCurrentDate();
  const currentTime = getCurrentTime();

  if (date === today && startTime <= currentTime) {
    toast.error("Start time must be later than the current time");
    return false;
  }

  if (endTime <= startTime) {
    toast.error("End time must be later than start time");
    return false;
  }

  const durationInMinutes = parseInt(selectedDuration);
  const startTimeDate = new Date(`${date} ${startTime}`);
  const endTimeDate = new Date(`${date} ${endTime}`);
  const timeDifferenceInMinutes = (endTimeDate - startTimeDate) / (1000 * 60);

  if (timeDifferenceInMinutes % durationInMinutes !== 0) {
    toast.error(
      `Time duration must be a multiple of ${durationInMinutes} minutes`
    );
    return false;
  }

  return true;
};

export default validateTime;
