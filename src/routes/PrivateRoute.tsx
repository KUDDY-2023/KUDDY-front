import { ReactElement, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children?: ReactElement;
  authentication: boolean; // true : 로그인해야 접근 가능, false : 비로그인해야 접근 가능
}

export default function PrivateRoute({
  authentication,
}: PrivateRouteProps): React.ReactElement | null {
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("accessToken"); // 현재 로그인 여부

  useEffect(() => {
    if (authentication && !isAuthenticated) {
      // alert("접근 불가능합니다. 로그인이 필요합니다.");
    }

    if (!authentication && isAuthenticated) {
      alert("접근 불가능합니다. 로그아웃이 필요합니다.");
      navigate(-1);
    }
  }, [authentication, isAuthenticated]);

  if (authentication) {
    return !isAuthenticated ? <Navigate to="/auth/register" /> : <Outlet />;
  } else {
    return !isAuthenticated ? <Outlet /> : null;
  }
}
