import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Results() {
  const score = useSelector((state) => state.results.score);

  return (
    <div className="div_outer h-screen items-center">
      <div className="div_inner border rounded-lg pb-5 px-5 flex flex-col items-center">
        <h1>Results</h1>
        <div className="text-xl pb-5">Score : {score}</div>
        <Link className="btn_blue" to={"/"}>
          Home
        </Link>
      </div>
    </div>
  );
}
