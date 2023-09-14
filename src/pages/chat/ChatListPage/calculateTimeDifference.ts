export default function calculateTimeDifference(sendAt: number) {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - sendAt;
  let dateUnit = "minutes";
  let beforeTime = Math.abs(Math.floor(timeDifference / (60 * 1000)));

  if (beforeTime >= 60) {
    beforeTime = Math.floor(beforeTime / 60);
    dateUnit = "hours";
  }
  if (beforeTime >= 24) {
    beforeTime = Math.floor(beforeTime / 24);
    dateUnit = "day";
  }

  if (isNaN(beforeTime)) beforeTime = 0;

  return { beforeTime, dateUnit };
}
