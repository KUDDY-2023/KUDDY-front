export const useFormatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
  const day = date.getDate();

  let hours = date.getHours();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  const minutes = date.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${year}.${month}.${day}  ${hours}:${formattedMinutes}${ampm}`;
};
