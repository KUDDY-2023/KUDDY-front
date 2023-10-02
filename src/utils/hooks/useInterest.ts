import { useState } from "react";

const useInterest = () => {
  const altGroup = (target: string) => {
    if (target === "artBeauty") return "Art";
    else if (target === "careerMajor") return "Career";
    else if (target === "entertainment") return "Entertainment";
    else if (target === "food") return "Food";
    else if (target === "hobbiesInterests") return "Hobbies";
    else if (target === "lifestyle") return "Lifestyle";
    else if (target === "sports") return "Sports";
    else if (target === "Group") return target;
    else return "";
  };
  const altElement = (target: string) => {
    if (
      target === "IT" ||
      target === "HR" ||
      target === "DIY" ||
      target === "Element"
    )
      return target;
    else
      return target
        .toLowerCase()
        .replace(/^[a-z]/, char => char.toUpperCase())
        .replace("_", " ");
  };
  return { altGroup, altElement };
};

export default useInterest;
