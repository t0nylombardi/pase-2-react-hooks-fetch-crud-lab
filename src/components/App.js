import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import { ApiRequest } from "../utils/ApiFetch";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const API_URL = "http://localhost:4000/questions";

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await ApiRequest(API_URL);
      console.log('data:', typeof data);
      setQuestions(data);
    };

    fetchQuestions();
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  const handleAddQuestion = async (newQuestion) => {
    const response = await ApiRequest(API_URL, 'POST', newQuestion);

    const data = await response.json();
    setQuestions([...questions, data]);
  };

  const handleDeleteQuestion = async (id) => {
    const response = await ApiRequest(`${API_URL}/${id}`, 'DELETE');

    if (response.ok) {
      setQuestions(questions.filter((question) => question.id !== id));
    }
  };

  const handleUpdateCorrectAnswer = async (id, correctIndex) => {
    const response = ApiRequest(`${API_URL}/${id}`, 'PUT', correctIndex);

    if (response.ok) {
      const updatedQuestions = questions.map((question) =>
        question.id === id ? { ...question, correctIndex } : question
      );
      setQuestions(updatedQuestions);
    }
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
