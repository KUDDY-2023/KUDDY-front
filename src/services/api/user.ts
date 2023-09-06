import axios from "axios";
import { apiClient } from ".";

// 유저 신고
export const authReportUser = (report: IReport) => {
  const url = `/api/v1/reports`;
  return apiClient.post(url, report);
};
