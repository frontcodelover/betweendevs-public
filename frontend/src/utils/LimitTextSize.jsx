export const limitTextSize = (description, limit) => {
  if (description.length > limit) {
    return description.slice(0, limit) + '...';
  } else {
    return description;
  }
};
