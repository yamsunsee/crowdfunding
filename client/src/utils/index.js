const getDaysLeft = (deadline) => {
  if (!deadline) return "";
  const endDate = new Date(deadline);
  const today = new Date();
  const different = endDate - today;
  return Math.max(0, Math.ceil(different / (1000 * 60 * 60 * 24)));
};

const getPercent = (current, total) => {
  return `${Math.min(100, Math.floor((current * 100) / total))}%`;
};

const checkValidImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

const displayAddress = (address) => {
  if (address)
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  return "...";
};

export { getDaysLeft, getPercent, checkValidImage, displayAddress };
