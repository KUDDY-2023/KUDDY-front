import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authReportUser } from "@services/api/auth";
import { useQuery } from "react-query";

/*
react-query 또는 recoil 관련 등 api 호출 후의 로직 포함  
*/

// 로그인
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

// 유저 신고
export const useAuthReportUser = (report: IReport) => {
  useEffect(() => {
    ReportUser();
  }, []);

  const ReportUser = async () => {
    try {
      const data = await authReportUser(report);
    } catch {
      alert("유저 신고에 실패 했습니다.");
    }
  };
};
