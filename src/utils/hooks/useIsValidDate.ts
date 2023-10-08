const useIsValidDate = () => {
  const checkBeforeToday = (dateString: string) => {
    const inputDate = new Date(dateString);
    const today = new Date();
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return inputDate < today;
  };

  const checkAfterToday = (dateString: string) => {
    const inputDate = new Date(dateString);
    const today = new Date();
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return inputDate >= today;
  };

  return [checkBeforeToday, checkAfterToday];
};

export default useIsValidDate;
