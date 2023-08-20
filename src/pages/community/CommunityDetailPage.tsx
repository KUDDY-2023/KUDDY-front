import { useParams } from "react-router-dom";
import BackNavBar from "@components/_common/backnavbar";

const CommunityDetailPage = () => {
  const { category } = useParams() as { category: string };

  return (
    <>
      <BackNavBar middleTitle={category} />
    </>
  );
};

export default CommunityDetailPage;
