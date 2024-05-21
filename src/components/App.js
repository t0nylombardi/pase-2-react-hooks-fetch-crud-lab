import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const App = () => {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const API_URL = "http://localhost:4000/questions";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((questions) => {
        setQuestions(questions);
      });
  }, []); // Empty array to run once

  const handleAddQuestion = async (newQuestion) => {
    console.log("Form data:", newQuestion);
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: newQuestion.prompt,
        answers: [
          newQuestion.answer1,
          newQuestion.answer2,
          newQuestion.answer3,
          newQuestion.answer4,
        ],
        correctIndex: parseInt(newQuestion.correctIndex, 10),
      }),
    })
    .then(response => response.json())
    .then(data => setQuestions([...questions, data]))
    .catch(error => console.error("There was a problem with the fetch operation:", error));
  };

  const handleDeleteQuestion = async (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then(() => {
      const updatedQuestions = questions.filter((question) => question.id !== id);
      setQuestions(updatedQuestions);
    });
  };

  const handleUpdateCorrectAnswer = async (id, correctIndex) => {
    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
    .then((res) => res.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((question) => {
        if (question.id === updatedQuestion.id) return updatedQuestion;
        return question;
      });
      setQuestions(updatedQuestions);
    });

    const updatedQuestions = questions.map((question) =>
      question.id === id ? { ...question, correctIndex } : question
    );
    setQuestions(updatedQuestions);
  };


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onSubmit={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={handleDeleteQuestion}
          onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
        />
      )}
    </main>
  );
}

export default App;
