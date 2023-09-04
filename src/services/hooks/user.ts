import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authReportUser, authGetRefreshToken } from "@services/api/auth";
import { useQuery, useMutation } from "react-query";

// 🔥 유저 신고 hook
export const useAuthReportUser = (report: IReport) => {
  const navigate = useNavigate();

  const { mutate: reportUser } = useMutation(authReportUser, {
    onSuccess: res => {
      // 성공 뒤 실행
      console.log("성공", res);
      navigate(-1);
    },
    onError: err => {
      // 실패 뒤 실행
      console.log("실패", err);
    },
  });

  const onReport = () => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        `해당 유저를 신고하시겠습니까? ${report.targetId} ${report.reason} ${report.explanation}`,
      )
    ) {
      reportUser(report);
    }
  };

  return { onReport };
};
