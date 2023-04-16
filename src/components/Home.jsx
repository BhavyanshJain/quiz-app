import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="div_outer h-screen items-center">
      <div className="div_inner border rounded-lg pb-5 px-5 space-y-10 hover:shadow-lg">
        <h1>Quiz App</h1>

        <div className="flex justify-around">
          <Link to={"/create"} className="btn_blue">
            Create Quiz
          </Link>

          <Link to={"/take"} className="btn_blue">
            Take Quiz
          </Link>

          <Link to={"/edit"} className="btn_blue">
            Edit Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
