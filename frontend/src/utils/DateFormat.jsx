export const dateFormat = (dateInput) => {
  var date = new Date(dateInput);
  let dateFormated = date.toLocaleString();
  return dateFormated;
};
