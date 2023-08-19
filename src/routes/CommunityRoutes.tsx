import { Routes, Route } from "react-router-dom";

import CommunityListPage from "@pages/community/CommunityListPage/index";
import WritePostPage from "@pages/community/WritePostPage";

export default function CommunityRoutes() {
  return (
    <Routes>
      <Route path="list" element={<CommunityListPage />} />
      <Route path="write" element={<WritePostPage />} />
    </Routes>
  );
}
