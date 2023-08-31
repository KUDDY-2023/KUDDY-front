import { ReactComponent as Google } from "@assets/auth/google.svg";

import "./googleBtn.scss";

interface Props {
  onClick: () => void;
}
export default function GoogleBtn({ onClick }: Props) {
  return (
    <div className="google-btn" onClick={onClick}>
      <Google />
      <p>Login with Google</p>
    </div>
  );
}
