import "./progressbar.scss";
import ProgressBar from "@ramonak/react-progress-bar";
import { useState, useEffect } from "react";

interface Props {
  completed: number;
}
export default function LoginProgressBar({ completed }: Props) {
  const [width, setWidth] = useState<string>("");

  const handleResizeBar = () => {
    let w = (window.innerWidth * 0.85).toString() + "px";
    setWidth(w);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResizeBar);
    return () => {
      window.removeEventListener("resize", handleResizeBar);
    };
  }, []);

  return (
    <ProgressBar
      className="progressbar"
      height="4px"
      width={width}
      completed={completed}
      maxCompleted={80}
      isLabelVisible={false}
      bgColor="#000"
      transitionDuration="0.5s"
    />
  );
}
