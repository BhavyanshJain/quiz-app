import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Edit() {
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

  const deleteQuiz = async (quiz) => {
    await fetch(`${process.env.REACT_APP_FIREBASE_URL}/quizzes/${quiz}.json`, {
      method: "DELETE",
    });

    const res = await fetch(
      `${process.env.REACT_APP_FIREBASE_URL}/quizzes.json`,
      {
        method: "GET",
      }
    );

    const data = await res.json();
    setQuizzes(data);
  };

  return (
    <div className="div_outer">
      <div className="div_inner">
        <h1>Edit Quiz</h1>

        {!quizzes ? (
          <div>Loading...</div>
        ) : (
          Object.keys(quizzes).map((quiz, i) => (
            <div
              key={i}
              className="border border-gray-300 p-4 my-4 rounded-lg select-none flex justify-between"
            >
              <div>
                <h2 className="text-xl font-bold">{quizzes[quiz].quizName}</h2>
                <p>Description: {quizzes[quiz].description}</p>
                <p>Questions: {quizzes[quiz].questions?.length}</p>
                <p>Points: {quizzes[quiz].points} point per question</p>
                <p>Time: {quizzes[quiz].time}min</p>
              </div>

              <div className="flex flex-col space-y-2 items-center justify-center">
                <Link to={`${quiz}`} className="btn_blue">
                  Edit Quiz
                </Link>

                <button className="btn_red" onClick={() => deleteQuiz(quiz)}>
                  Delete Quiz
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
