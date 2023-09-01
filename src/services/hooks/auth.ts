import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authReportUser } from "@services/api/auth";
import { useQuery, useMutation } from "react-query";
import { profileState } from "@services/store/auth";
import { useRecoilState } from "recoil";
// useQuery : get
// useMutation : post, delete, patch, put

/*
react-query 또는 recoil 관련 등 api 호출 후의 로직 포함  

함수 이름은 use로 시작 
*/

// 테스트

// ✅ 로그인
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
