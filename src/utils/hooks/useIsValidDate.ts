import dayjs from "dayjs";

const useIsValidDate = () => {
  const checkBeforeToday = (dateString: string) => {
    const inputDate = dayjs(dateString).startOf("day");
    const today = dayjs().startOf("day");
    console.log("선택된 날짜:", inputDate.format(), "오늘:", today.format());
    return inputDate.isBefore(today);
  };

  const checkAfterToday = (dateString: string) => {
    const inputDate = dayjs(dateString).startOf("day");
    const today = dayjs().startOf("day");
    return inputDate.isSame(today) || inputDate.isAfter(today);
  };

  return [checkBeforeToday, checkAfterToday];
};

export default useIsValidDate;
