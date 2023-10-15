import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authGetRefreshToken } from "@services/api/auth";
import {
  authReportUser,
  userGetMeetUps,
  userPostReview,
  userGetReviewModal,
  userPutMeetUpCancel,
} from "@services/api/user";
import { useQuery, useMutation } from "react-query";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { isLoginState } from "@services/store/auth";
import { neverShowMeetupId } from "@services/store/reviewmodal";

import {
  reportUserAlert,
  reportUserSuccessAlert,
  reportUserFailAlert,
} from "@components/_common/SweetAlert";

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

  const { mutate: reportUser, isLoading } = useMutation(authReportUser, {
    onSuccess: res => {
      // 성공 뒤 실행
      reportUserSuccessAlert();
      navigate(-1);
    },
    onError: err => {
      // 실패 뒤 실행
      reportUserFailAlert();
      console.log(err);
    },
  });

  const onReport = () => {
    reportUserAlert().then(result => {
      if (result.isConfirmed) {
        reportUser(report);
      }
    });
  };

  return { onReport, isLoading };
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

// 동행 취소 요청
export const usePutMeetUpCancel = () => {
  const onMeetUpCancel = async (id: number) => {
    try {
      const res = await userPutMeetUpCancel(id);
      return res;
    } catch (err: any) {
      if (err.response.data.errorCode === "C100") {
        alert("작성자가 아니므로 권한이 없습니다.");
      }
      console.log(err);
    }
  };
  return onMeetUpCancel;
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

// 리뷰 작성하러 가기 모달 여부
export const useReviewModal = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [meetupId, setMeetupId] = useState<number | undefined>(undefined);
  const isLogin = useRecoilValue(isLoginState);
  const neverIdList = useRecoilValue(neverShowMeetupId);
  const resetNeverId = useResetRecoilState(neverShowMeetupId);

  const exRes = {
    data: {
      status: 200,
      message: "SUCCESS",
      data: {
        meetupList: [
          {
            meetupId: 1,
            spotId: 1,
            spotName: "Cafe Nangmanjeok (카페낭만적)",
            appointmentTime: "2023-09-13 23:55:39",
            createdDate: "2023-08-29 22:48:05",
            meetupStatus: "PAYED",
            targetMemberInfo: {
              writerId: 1,
              targetNickname: "최빈",
              profileImageUrl:
                "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
            },
            reviewed: false,
          },
          {
            meetupId: 2,
            spotId: 1,
            spotName: "Cafe Nangmanjeok (카페낭만적)",
            appointmentTime: "2023-09-12 23:55:39",
            createdDate: "2023-08-29 22:48:05",
            meetupStatus: "PAYED",
            targetMemberInfo: {
              writerId: 1,
              targetNickname: "최빈",
              profileImageUrl:
                "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
            },
            reviewed: false,
          },
        ],
        totalMeetupCount: 2,
      },
    },
  };

  useEffect(() => {
    if (isLogin)
      getReviewModal()
        .then(res => {
          if (res?.data.data.totalMeetupCount === 0) {
            setIsModal(false);
            resetNeverId();
          } else {
            if (res?.data.data.meetupList.length !== 0)
              res?.data.data.meetupList.map((item: any) => {
                if (!neverIdList.includes(item.meetupId)) {
                  setMeetupId(item.meetupId);
                  setIsModal(true);
                }
              });
          }
        })
        .catch();
  }, []);

  const getReviewModal = async () => {
    try {
      const res = await userGetReviewModal();
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return { isModal, meetupId };
};
