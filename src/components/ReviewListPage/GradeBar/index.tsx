import "./grade-bar.scss";
import ProgressBar from "@ramonak/react-progress-bar";

type Props = {
  perfect: string;
  good: string;
  disappoint: string;
};

const GradeBar = ({ perfect, good, disappoint }: Props) => {
  const grades = [
    { text: "Excellent", percent: perfect },
    { text: "Good", percent: good },
    { text: "Disappointing", percent: disappoint },
  ];

  return (
    <div className="grade-bar-container">
      {grades.map(grade => {
        return (
          <div className="grade-container">
            <div
              className={grade.text === "Excellent" ? "grade perfect" : "grade"}
            >
              {grade.text}
            </div>
            <ProgressBar
              className="progress-bar"
              height="4px"
              completed={grade.percent.replace("%", "")}
              isLabelVisible={false}
              bgColor="#000"
            />
            <div className="percent">{grade.percent}</div>
          </div>
        );
      })}
    </div>
  );
};

export default GradeBar;
