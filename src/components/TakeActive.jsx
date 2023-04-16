import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addResult } from "../redux/resultsSlice";

export default function TakeActive() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quiz: quizID } = useParams();

  const [countDown, setCountDown] = useState();
  const timerId = useRef();

  const [quiz, setQuiz] = useState();
  const [currQuesNo, setCurrQuesNo] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  useEffect(() => {
    const getQuiz = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_URL}/quizzes/${quizID}.json`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setQuiz(data);

      // answers
      const arr = [];
      for (let i = 0; i < data.questions.length; i++) {
        arr.push({
          option1: false,
          option2: false,
          option3: false,
          option4: false,
        });
      }
      setAnswers(arr);
      setCountDown(data.time * 60);

      console.log(data);
      console.log(arr);
    };
    getQuiz();
  }, [quizID]);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (countDown <= 0) {
      clearInterval(timerId.current);

      answers[currQuesNo] = currentAnswer;
      const response = [];
      answers.forEach((answer) => {
        const options = Object.keys(answer);
        const selectedOptions = [];
        options.forEach((option, i) => {
          if (answer[option]) {
            selectedOptions.push(i + 1);
          }
        });
        response.push(selectedOptions);
      });

      const correct = [];
      quiz.questions.forEach((question, i) => {
        correct.push(question.correctOptions);
      });

      // score calculation
      let score = 0;
      for (let i = 0; i < response.length; i++) {
        if (response[i].length === correct[i].length) {
          let flag = true;
          for (let j = 0; j < response[i].length; j++) {
            if (response[i][j] !== correct[i][j]) {
              flag = false;
              break;
            }
          }
          if (flag) {
            score += quiz.points;
          }
        }
      }

      dispatch(addResult(score));
      navigate("/results");
    }
  }, [answers, countDown, currQuesNo, currentAnswer, dispatch, navigate, quiz]);

  const handleChange = (e) => {
    setCurrentAnswer({
      ...currentAnswer,
      [e.target.name]: e.target.checked,
    });
  };

  const saveAnswer = () => {
    setAnswers((prev) => {
      prev[currQuesNo] = currentAnswer;
      return prev;
    });
  };

  const handleNext = () => {
    saveAnswer();
    if (currQuesNo < quiz.questions.length - 1) {
      setCurrentAnswer(answers[currQuesNo + 1]);
      setCurrQuesNo(currQuesNo + 1);
    }
  };

  const handlePrev = () => {
    if (currQuesNo > 0) {
      setCurrentAnswer(answers[currQuesNo - 1]);
      setCurrQuesNo(currQuesNo - 1);
    }
  };

  const handleFinish = () => {
    setCountDown(0);
  };

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    if (minutes <= 9) minutes = `0${minutes}`;
    if (seconds <= 9) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="div_outer h-screen items-center">
      <div className="div_inner border rounded-lg p-5 shadow-lg">
        <div className=" flex justify-between items-center">
          <div className="text-blue-500 font-bold text-lg">
            Timer: {formatTime(countDown && countDown)}
          </div>
          <button className="btn_green" onClick={handleFinish}>
            Save & Finish
          </button>
        </div>
        <div className="border border-t-0 my-4" />
        <div className="flex flex-col space-y-2">
          <div>
            <span className="font-bold">Q{currQuesNo + 1}: </span>
            {quiz?.questions[currQuesNo].question}
          </div>

          <div className="flex flex-col space-y-2 pt-2">
            {quiz?.questions[currQuesNo].options.map((option, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  id={`option${i}`}
                  name={`option${i + 1}`}
                  checked={currentAnswer[`option${i + 1}`]}
                  onChange={(e) => handleChange(e)}
                  className="checkbox"
                />
                <label htmlFor={`option${i}`} className="px-2 cursor-pointer">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex items-center justify-between pt-5">
          <button
            disabled={currQuesNo < 1 ? true : false}
            className="btn_blue disabled:bg-gray-300 disabled:hover:text-black disabled:hover:cursor-not-allowed"
            onClick={handlePrev}
          >
            Prev
          </button>

          <button className="btn_blue" onClick={handleNext}>
            Save & Next
          </button>
        </div>
        <button className="btn_red mt-5" onClick={() => setCountDown(5)}>
          Set timer to 5 seconds (developmental purposes)
        </button>
      </div>
    </div>
  );
}
