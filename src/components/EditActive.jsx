import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EditActive() {
  const { quiz: quizID } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState();
  const [question, setQuestion] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctOption1: false,
    correctOption2: false,
    correctOption3: false,
    correctOption4: false,
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
      data.questions = data.hasOwnProperty("questions") ? data.questions : [];
      setQuiz(data);
    };
    getQuiz();
  }, [quizID]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuestion((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const correctOptions = [];
    question.correctOption1 && correctOptions.push(1);
    question.correctOption2 && correctOptions.push(2);
    question.correctOption3 && correctOptions.push(3);
    question.correctOption4 && correctOptions.push(4);

    if (correctOptions.length === 0) {
      return alert("Please select atleast one correct option");
    }

    const options = [
      question.option1,
      question.option2,
      question.option3,
      question.option4,
    ];

    if (!quiz.questions) {
      setQuiz((prev) => ({
        ...prev,
        questions: [
          {
            question: question.question,
            options,
            correctOptions,
          },
        ],
      }));
    } else {
      setQuiz((prev) => ({
        ...prev,
        questions: [
          ...prev?.questions,
          {
            question: question.question,
            options,
            correctOptions,
          },
        ],
      }));
    }
    setQuestion({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctOption1: false,
      correctOption2: false,
      correctOption3: false,
      correctOption4: false,
    });
  };

  const editQuestion = (index) => {
    const { question, options, correctOptions } = quiz.questions[index];
    setQuestion({
      question,
      option1: options[0],
      option2: options[1],
      option3: options[2],
      option4: options[3],
      correctOption1: correctOptions.includes(1),
      correctOption2: correctOptions.includes(2),
      correctOption3: correctOptions.includes(3),
      correctOption4: correctOptions.includes(4),
    });
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((item, i) => i !== index),
    }));
  };

  const deleteQuestion = (index) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((item, i) => i !== index),
    }));
  };

  const submitAndExit = async () => {
    await fetch(
      `${process.env.REACT_APP_FIREBASE_URL}/quizzes/${quizID}.json`,
      {
        method: "PUT",
        body: JSON.stringify(quiz),
      }
    );
    navigate("/");
  };

  return (
    <div className="div_outer">
      <div className="div_inner">
        <h1>Edit Quiz</h1>
        <div>
          {quiz?.questions?.map((question, index) => (
            <div key={index} className="flex mb-5 border p-2 rounded-lg">
              <div className="flex flex-col px-2 space-y-2">
                <button
                  className="btn_blue"
                  onClick={() => editQuestion(index)}
                >
                  Edit
                </button>
                <button
                  className="btn_red"
                  onClick={() => deleteQuestion(index)}
                >
                  delete
                </button>
              </div>

              <div className="flex flex-col justify-center px-2 ">
                <div>
                  Question {index + 1} : {question.question}
                </div>
                <div>Options: [{question.options.toString()}]</div>
                <div>
                  Correct Option: [{question.correctOptions.toString()}]
                </div>
              </div>
            </div>
          ))}

          <form className="border rounded-lg p-5" onSubmit={handleSubmit}>
            <label className="label_block">Question</label>
            <input
              name="question"
              autoFocus={true}
              required
              type="text"
              value={question.question}
              onChange={(e) => handleChange(e)}
              className="input"
            />

            <div className="grid grid-cols-2 items-center justify-center">
              <div className="w-full">
                <label className="label_block">Option 1</label>
                <input
                  name="option1"
                  required
                  type="text"
                  value={question.option1}
                  onChange={(e) => handleChange(e)}
                  className="input"
                />

                <label className="label_block">Option 2</label>
                <input
                  name="option2"
                  required
                  type="text"
                  value={question.option2}
                  onChange={(e) => handleChange(e)}
                  className="input"
                />

                <label className="label_block">Option 3</label>
                <input
                  name="option3"
                  required
                  type="text"
                  value={question.option3}
                  onChange={(e) => handleChange(e)}
                  className="input"
                />

                <label className="label_block">Option 4</label>
                <input
                  name="option4"
                  required
                  type="text"
                  value={question.option4}
                  onChange={(e) => handleChange(e)}
                  className="input"
                />
              </div>

              <div className="flex flex-col space-y-2 w-full items-center justify-center">
                <p className="mt-5 pb-1">Correct Answer</p>

                <div className="space-x-2">
                  <input
                    name="correctOption1"
                    id="correctOption1"
                    type="checkbox"
                    checked={question.correctOption1}
                    onChange={(e) => handleChange(e)}
                    className="checkbox"
                  />
                  <label htmlFor="correctOption1" className="label_inline">
                    Option 1
                  </label>
                </div>

                <div className="space-x-2">
                  <input
                    name="correctOption2"
                    id="correctOption2"
                    type="checkbox"
                    checked={question.correctOption2}
                    onChange={(e) => handleChange(e)}
                    className="checkbox"
                  />
                  <label htmlFor="correctOption2" className="label_inline">
                    Option 2
                  </label>
                </div>

                <div className="space-x-2">
                  <input
                    name="correctOption3"
                    id="correctOption3"
                    type="checkbox"
                    checked={question.correctOption3}
                    onChange={(e) => handleChange(e)}
                    className="checkbox"
                  />
                  <label htmlFor="correctOption3" className="label_inline ">
                    Option 3
                  </label>
                </div>

                <div className="space-x-2">
                  <input
                    name="correctOption4"
                    id="correctOption4"
                    type="checkbox"
                    checked={question.correctOption4}
                    onChange={(e) => handleChange(e)}
                    className="checkbox"
                  />
                  <label htmlFor="correctOption4" className="label_inline ">
                    Option 4
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" className="mt-5 btn_blue">
              Add Question
            </button>
          </form>
          <div className="py-5">
            <button className="btn_green w-full" onClick={submitAndExit}>
              Save & Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
