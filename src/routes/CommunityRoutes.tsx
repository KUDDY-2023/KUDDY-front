import { Routes, Route } from "react-router-dom";

import CommunityListPage from "@pages/community/CommunityListPage/index";
import WritePostPage from "@pages/community/WritePostPage";
import ItineraryFeedbackDetailPage from "@pages/community/ItineraryFeedbackDetailPage";
import TalkingBoardDetailPage from "@pages/community/TalkingBoardDetailPage";

export default function CommunityRoutes() {
  return (
    <Routes>
      <Route path="list" element={<CommunityListPage />} />
      <Route
        path="itinerary-feedback/:id"
        element={<ItineraryFeedbackDetailPage />}
      />
      <Route path="talking-board/:id" element={<TalkingBoardDetailPage />} />
      <Route path="write" element={<WritePostPage />} />
    </Routes>
  );
}
