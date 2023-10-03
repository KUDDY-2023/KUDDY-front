import { useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";

import { isLoginState, accessTokenState } from "@services/store/auth";
import { profileImage } from "@services/store/profile";

import { authLogOut, authDeleteAccount } from "@services/api/auth";
import { profileGetProfile } from "@services/api/profile";
import { updateAuthHeader } from "@services/api"; // axios 토큰 업데이트

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

// ✅ 로그인 상태를 관리하는 훅
export const useSetLoginState = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  useEffect(() => {
    IsLogin();
    // console.log("로그인 상태", isLogin);
  }, [location.pathname]);

  const IsLogin = () => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLogin(accessToken ? true : false);
  };
};

// ✅ AccessToken 저장 훅
export const useAuthLogin = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    Login();
  }, []);

  const Login = async () => {
    console.log("로그인 실행 - accessToken 저장");
    const newAccessToken = searchParams.get("accessToken");
    if (newAccessToken) {
      updateAuthHeader(newAccessToken); // axios 헤더 바꾸는 훅 필요
      setAccessToken(newAccessToken); // accessToken atom 변경
      setIsLogin(true); // 로그인 상태
      localStorage.setItem("accessToken", newAccessToken); // 로컬 스토리지에 저장
      navigate("/");
    } else {
      alert("로그인에 실패하였습니다.");
      navigate("/auth/register");
    }
  };
};

// ✅ 로그아웃
export const useAuthLogout = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const navigate = useNavigate();
  const resetProfileImage = useResetRecoilState(profileImage);

  const Logout = async () => {
    try {
      const res = await authLogOut(accessToken);
    } catch (err) {
      alert("서버 오류로 로그아웃에 실패했습니다.");
      console.log("로그아웃 실패 >> ", err);
    }

    // 서버 성공 여부와 상관 없이 클라이언트에선 로그아웃 진행

    setAccessToken(""); // 토큰 날리기
    setIsLogin(false); // 비로그인상태
    updateAuthHeader(); // axios 헤더에서 토큰 비우기
    localStorage.removeItem("accessToken"); // localstorage 삭제
    resetProfileImage(); // profile image recoil 초기화
    navigate("/"); // 메인 페이지로 이동
  };

  return Logout;
};

// ✅ 토큰 재발급 후 토큰 상태 관리하는 훅
export const useAuthReLogin = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const navigate = useNavigate();

  const ReLogin = (newAccessToken: string) => {
    updateAuthHeader(newAccessToken); // axios 헤더 바꾸는 훅 필요
    setAccessToken(newAccessToken); // accessToken atom 변경
    setIsLogin(true); // 로그인 상태
    localStorage.setItem("accessToken", newAccessToken); // 새 토큰 저장

    console.log("ReLogin 후 전역 accessToken", accessToken);
  };

  return ReLogin;
};

// ✅ 최초 로그인 여부 (main페이지와 form 페이지에서 사용)
type state = "MAIN" | "FORM";

export const useIsFirstLogin = async (state: state) => {
  const [isLogin, _] = useRecoilState(isLoginState);
  const navigate = useNavigate();

  useEffect(() => {
    Goto();
  }, []);

  const Goto = async () => {
    if (state === "MAIN" && !isLogin) {
      console.log("메인, 로그인 안해서 필요 없음");
      return;
    }
    try {
      const res = await profileGetProfile(); // 조회
      if (state === "FORM") {
        alert("이미 만드셨네요.....");
        navigate("/");
      }
    } catch (err: any) {
      console.log("프로필 조회 실패", err);
      let errCode = err.response.data.message;

      // 프로필 없는 경우
      if (state === "MAIN" && errCode === "프로필을 찾을 수 없습니다.") {
        alert("프로필 만들어주세요...");
        navigate("/auth/form");
      }
    }
  };
};

// ✅ 탈퇴 요청
export const useAuthDeleteAccount = () => {
  const [_, setAccessToken] = useRecoilState(accessTokenState);
  const [__, setIsLogin] = useRecoilState(isLoginState);
  const navigate = useNavigate();

  const onDeleteAccount = async () => {
    try {
      const res = await authDeleteAccount();
      updateAuthHeader(""); // axios 헤더 비우기
      setAccessToken(""); // accessToken atom 변경
      setIsLogin(false); // 로그인 상태
      localStorage.removeItem("accessToken"); // 토큰 삭제
      alert("성공적으로 탈퇴하였습니다.");
      navigate("/");
    } catch (err) {
      alert("서버 문제로 탈퇴 실패! 다시 시도해주세요");
      console.log(err);
    }
  };

  return onDeleteAccount;
};
