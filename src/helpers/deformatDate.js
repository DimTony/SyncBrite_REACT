const getFormattedDate = (event, dateFields) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDates = {};
  dateFields.forEach((field) => {
    formattedDates[field] = new Date(event[field])
      .toLocaleDateString("en-US", options)
      .toUpperCase();
  });

  return formattedDates;
};

export default getFormattedDate;
