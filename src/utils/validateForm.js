const validateForm = (eventData, date, startTime, endTime) => {
  const isPriceValid =
    /^\d+(\.\d{1,2})?$/.test(eventData.price) &&
    parseFloat(eventData.price) >= 0;

  return (
    eventData &&
    eventData.nameEvent &&
    eventData.ImgSRC &&
    eventData.description &&
    isPriceValid &&
    eventData.nameEvent.trim() !== "" &&
    eventData.ImgSRC.trim() !== "" &&
    eventData.description.trim() !== "" &&
    date.trim() !== "" &&
    startTime.trim() !== "" &&
    endTime.trim() !== ""
  );
};

export default validateForm;
