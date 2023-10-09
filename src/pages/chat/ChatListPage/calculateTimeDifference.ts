export default function calculateTimeDifference(sendAt: number): string {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - sendAt;
  let result: string;

  if (timeDifference < 60 * 1000) {
    result = `${Math.floor(timeDifference / 1000)} second${
      Math.floor(timeDifference / 1000) === 1 ? "" : "s"
    } ago`;
  } else if (timeDifference < 3600 * 1000) {
    result = `${Math.floor(timeDifference / (60 * 1000))} minute${
      Math.floor(timeDifference / (60 * 1000)) === 1 ? "" : "s"
    } ago`;
  } else if (timeDifference < 86400 * 1000) {
    result = `${Math.floor(timeDifference / (3600 * 1000))} hour${
      Math.floor(timeDifference / (3600 * 1000)) === 1 ? "" : "s"
    } ago`;
  } else if (timeDifference < 172800 * 1000) {
    result = "yesterday";
  } else {
    const sendDate = new Date(sendAt);
    const day = sendDate.getDate();
    const month = sendDate.toLocaleString("en-US", { month: "long" });
    result = `${day}, ${month}`;
  }

  return result;
}
