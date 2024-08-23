const dateFormatter = (date) => {
  const newDate = new Date(+date);

  const options = { month: "long", day: "numeric", year: "numeric" };

  const formattedDate = newDate.toLocaleDateString("en-US", options);

  return formattedDate;
};

export default dateFormatter;
