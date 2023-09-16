import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authGetRefreshToken } from "@services/api/auth";
import {
  authReportUser,
  userGetMeetUps,
  userPostReview,
} from "@services/api/user";
import { useQuery, useMutation } from "react-query";

// 🔥 유저 신고 hook
export const useAuthReportUser = (report: IReport) => {
  const reasons = [
    "IMPERSONATION",
    "SPAM",
    "INTELLECTUAL_PROPERTY_VIOLATION",
    "HARASSMENT_OR_PRIVACY_VIOLATION",
    "NUDITY_OR_PORNOGRAPHY",
    "OTHER",
  ];
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
        `해당 유저를 신고하시겠습니까? ${report.targetId} ${
          reasons[report.reason]
        } ${report.explanation}`,
      )
    ) {
      reportUser(report);
    }
  };

  return { onReport };
};

// 내 동행 리스트 조회
export const useGetMeetUps = () => {
  const onGetMeetUps = async () => {
    try {
      const res = await userGetMeetUps();
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  return onGetMeetUps;
};

// 리뷰 작성
export const usePostReview = () => {
  const nav = useNavigate();
  const onPostReview = async (review: any) => {
    try {
      const res = await userPostReview(review);
      nav("/my/appointment");
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return onPostReview;
};
