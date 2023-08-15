import React from "react";
import "./App.scss"; // scss 설정
import { BrowserRouter } from "react-router-dom";
import Test from "@components/Test"; // craco 설정

function App() {
  return (
    <BrowserRouter>
      <Test />
      <div>프로젝트 세팅 테스트 </div>
    </BrowserRouter>
  );
}

export default App;
