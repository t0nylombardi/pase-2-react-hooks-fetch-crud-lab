import React from "react";
import QuestionItem from "./QuestionItem";

const QuestionList = ({ questions, onDelete, onUpdateCorrectAnswer }) => {
  console.log('questions:', questions);
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id} // Key for each item
            question={question}
            onDelete={onDelete} // Pass down delete function
            onUpdateCorrectAnswer={onUpdateCorrectAnswer} // Pass down update function
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;