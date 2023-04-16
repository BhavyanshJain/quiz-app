import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TakeQuiz() {
  const [quizzes, setQuizzes] = useState();

  useEffect(() => {
    const getQuizzes = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_URL}/quizzes.json`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setQuizzes(data);
    };
    getQuizzes();
  }, []);

  return (
    <div className="div_outer">
      <div className="div_inner">
        <h1>Take Quiz</h1>

        {!quizzes ? (
          <div>Loading...</div>
        ) : (
          Object.keys(quizzes).map((quiz, i) => (
            <div
              key={i}
              className="border border-gray-300 p-4 my-4 rounded-lg flex justify-between"
            >
              <div>
                <h2 className="text-xl font-bold">{quizzes[quiz].quizName}</h2>
                <p>Description: {quizzes[quiz].description}</p>
                <p>Questions: {quizzes[quiz].questions?.length}</p>
                <p>Points: {quizzes[quiz].points} point per question</p>
                <p>Time: {quizzes[quiz].time}min</p>
              </div>

              <div className="flex items-center">
                <Link to={`${quiz}`} className="btn_blue">
                  Take Quiz
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
