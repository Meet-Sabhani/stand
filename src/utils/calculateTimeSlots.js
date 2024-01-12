export default function calculateTimeSlots(startTime, endTime, interval) {
  const timeSlots = [];

  for (
    let currentTime = startTime;
    currentTime <= endTime;
    currentTime += interval
  ) {
    const slotStart = convertMinutesToTime(currentTime);
    const slotEnd = convertMinutesToTime(currentTime + interval);
    timeSlots.push({ time: `${slotStart} - ${slotEnd}`, booked: false });
  }

  return timeSlots;
}

function convertMinutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${padZero(hours)}:${padZero(remainingMinutes)}`;
}

function padZero(value) {
  return value < 10 ? `0${value}` : value.toString();
}
