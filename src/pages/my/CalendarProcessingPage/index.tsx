import Loading from "@components/_common/Loading";
import { useAccessCalendar } from "@services/hooks/calendar";

const CalendarProcessingPage = () => {
  const onAccessCalendar = useAccessCalendar();
  onAccessCalendar();

  return (
    <>
      <Loading backColor="transparent" spinnerColor="#eee" size="30px" />
    </>
  );
};

export default CalendarProcessingPage;
