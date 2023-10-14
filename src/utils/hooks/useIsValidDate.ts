import dayjs from "dayjs";

const useIsValidDate = () => {
  const checkBeforeToday = (dateString: string) => {
    dateString = dateString.split("T")[0].replaceAll(".", "/");
    dateString += " 00:00:00";

    const inputDate = dayjs(dateString).startOf("day");
    const today = dayjs().startOf("day");

    return inputDate.isBefore(today) && !inputDate.isSame(today);
  };

  const checkAfterToday = (dateString: string) => {
    const inputDate = dayjs(dateString).startOf("day");
    const today = dayjs().startOf("day");
    return inputDate.isSame(today) || inputDate.isAfter(today);
  };

  return [checkBeforeToday, checkAfterToday];
};

export default useIsValidDate;
