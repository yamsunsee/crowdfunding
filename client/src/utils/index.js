const getDaysLeft = (deadline) => {
  const endDate = new Date(deadline);
  const today = new Date();
  const different = endDate - today;
  return Math.max(0, Math.ceil(different / (1000 * 60 * 60 * 24)));
};

const getPercent = (current, total) => {
  return `${Math.min(100, Math.floor((current * 100) / total))}%`;
};

export { getDaysLeft, getPercent };
