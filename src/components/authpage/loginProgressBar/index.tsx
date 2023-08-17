import "./progressbar.scss";
import ProgressBar from "@ramonak/react-progress-bar";
import { useState, useEffect } from "react";

export default function LoginProgressBar() {
  const [width, setWidth] = useState<string>();

  useEffect(() => {
    let w = (window.innerWidth * 0.85).toString() + "px";
    setWidth(w);
  }, []);

  return (
    <ProgressBar
      className="progressbar"
      height="4px"
      width={width}
      completed={50}
      maxCompleted={100}
      isLabelVisible={false}
      bgColor="#000"
      transitionDuration="0.5s"
    />
  );
}
