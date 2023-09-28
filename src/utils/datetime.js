export const getTimeDifference = (
  startDate,
  endDate = new Date(startDate),
  differenceBy = 'day'
) => {
  const timeDiff = differenceBy.toLowerCase().replace(/s$/, '');
  if (!startDate) {
    return null;
  }

  const now = new Date();
  const time = endDate;
  const diff = (now.getTime() - time.getTime()) / 1000;
  const diffMin = Math.round(diff / 60);
  const diffHours = Math.round(diff / 3600);
  const diffDays = Math.round(diff / (3600 * 24));

  if (timeDiff.toLowerCase() === 'second' || diff < 60) {
    return `seconds ago`;
  } else if (timeDiff.toLowerCase() === 'minute' || diffMin < 60) {
    return `${diffMin}m ago`;
  } else if (timeDiff.toLowerCase() === 'hour' || diffHours < 24) {
    return `${diffHours}h ago`;
  } else {
    return `${diffDays}d ago`;
  }
};
