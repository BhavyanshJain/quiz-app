import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateQuiz() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    quizName: "",
    description: "",
    points: 1,
    time: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.REACT_APP_FIREBASE_URL}/quizzes.json`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    navigate(`/edit/${data.name}`);
  };

  return (
    <div className="div_outer h-screen items-center">
      <div className="div_inner border rounded-lg pb-5 px-20 hover:shadow-lg">
        <h1>Create Quiz</h1>

        <form onSubmit={handleSubmit}>
          <label className="label_block">Quiz Name</label>
          <input
            name="quizName"
            autoFocus={true}
            required
            type="text"
            value={formData.quizName}
            onChange={(e) => handleChange(e)}
            className="input"
          />

          <label className="label_block">Description</label>
          <textarea
            name="description"
            required
            type="text"
            rows={3}
            value={formData.description}
            onChange={(e) => handleChange(e)}
            className="input"
          />

          <label className="label_block">Points per Question</label>
          <input
            name="points"
            required
            type="number"
            min={1}
            value={formData.points}
            onChange={(e) => handleChange(e)}
            className="input"
          />

          <label className="label_block">TimeLimit (in minutes)</label>
          <input
            name="time"
            required
            type="number"
            min={1}
            value={formData.time}
            onChange={(e) => handleChange(e)}
            className="input"
          />

          <button type="submit" className="btn_green mt-5">
            Save & Next
          </button>
        </form>
      </div>
    </div>
  );
}
