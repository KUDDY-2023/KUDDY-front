import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authReportUser, authGetRefreshToken } from "@services/api/auth";
import { useQuery, useMutation } from "react-query";
import { profileState } from "@services/store/auth";
import { useRecoilState } from "recoil";

import { useGetProfile } from "./profile";
import { profileGetProfile } from "@services/api/profile";
// useQuery : get
// useMutation : post, delete, patch, put

/*
react-query 또는 recoil 관련 등 api 호출 후의 로직 포함  

함수 이름은 use로 시작 
*/

// ✅ 소셜 로그인 요청 훅
export const useAuthSocialLogin = () => {
  type socialType = "kakao" | "google";

  const onLogin = (social: socialType) => {
    const SOCIAL = social;
    const CLIENT_MAIN_URL = process.env.REACT_APP_REACT_URL; // 현재 나의 uri
    const REDIRECT_URI = `${CLIENT_MAIN_URL}`; // redirect uri
    const SPRING = process.env.REACT_APP_API_HOST; // spring 서버
    const URL = `${SPRING}/oauth2/authorization/${SOCIAL}?redirect_uri=${REDIRECT_URI}`;

    window.location.href = URL; // 이동
  };

  return onLogin;
};

// ✅ AccessToken 저장 훅
export const useAuthLogin = () => {
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    Login();
  }, []);

  const Login = async () => {
    console.log("로그인 실행 - accessToken 저장");
    const accessToken = searchParams.get("accessToken");
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken); // 로컬 스토리지에 저장
      navigate("/");
    } else {
      alert("로그인에 실패하였습니다.");
      navigate("/auth/register");
    }
  };
};

// ✅ refreshToken으로 accessToken 다시 저장하는 훅
export const useAuthReLogin = () => {
  // 토큰 꺼내오는 로직 필요
  const refreshToken = "~~";

  useEffect(() => {
    ReLogin();
  }, []);

  const ReLogin = async () => {
    try {
      const { accessToken } = await authGetRefreshToken(refreshToken); // 토큰 요청
      localStorage.setItem("accessToken", accessToken); // 새 토큰 저장
    } catch {
      alert("엑세스 토큰 재발급 실패");
    }
  };
};

// ✅ 최초 로그인 여부  - main 페이지에서 활용
type state = "NEW_USER" | "NOT_NEW_USER";

export const useIsFirstLogin = (state: state) => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery(
    "userProfile",
    profileGetProfile,
    { retry: false }, // 재요청 끄기
  );

  useEffect(() => {
    if (!isLoading) {
      isFirst();
    }
  }, [data, isLoading, error]);

  const isFirst = () => {
    if (state === "NEW_USER" && error) {
      console.log("홈 조회 결과", data, isLoading, error);
      // 프로필 없는 최초 로그인 유저는 form으로 이동 필수
      navigate("/auth/form");
    } else if (state === "NOT_NEW_USER" && data) {
      console.log("이미 프로필 있음", data, isLoading, error);
      // 이미 프로필을 만든 유저는 form 페이지 접근 불가
      navigate("/");
    }
  };
};

// 🔥 유저 신고
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

// 토큰 재발급
export const useAuthRefresh = () => {
  useEffect(() => {
    RefreshTokens();
  }, []);

  const RefreshTokens = async () => {};
};

// 탈퇴
export const useAuthDeleteAccount = () => {
  useEffect(() => {
    DeleteAccount();
  }, []);

  const DeleteAccount = async () => {};
};

// 로그아웃
export const useAuthLogout = () => {
  useEffect(() => {
    Logout();
  }, []);

  const Logout = async () => {
    localStorage.removeItem("accessToken");
  };
};

// 프로필 생성
export const useAuthPostProfile = () => {
  useEffect(() => {
    PostProfile();
  }, []);

  const PostProfile = async () => {};
};
