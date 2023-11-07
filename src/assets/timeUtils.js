export function getTimeSincePost(created_utc) {
  const currentTime = Math.floor(Date.now() / 1000);
  const elapsedTime = currentTime - created_utc; // This needs to be calculated after currentTime is defined
  const secondsInAnHour = 3600;
  const secondsInADay = 86400;

  if (elapsedTime < secondsInAnHour) {
    if (elapsedTime >= 30 * 60) {
      // If it's 30 minutes or more, round up to an hour.
      return `1 hour ago`;
    } else {
      const minutes = Math.floor(elapsedTime / 60);
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }
  } else if (elapsedTime < secondsInADay) {
    const hours = Math.floor(elapsedTime / secondsInAnHour);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else {
    const days = Math.floor(elapsedTime / secondsInADay);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }
}
