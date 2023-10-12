import React from 'react';
import Survey from './Survey';

function QAPrinter() {
  const questions = ['Question 1', 'Question 2', 'Question 3'];
  const answers = ['Answer 1', 'Answer 2', 'Answer 3'];

  // Use the map function to create an array of JSX elements
  const qaPairs = questions.map((question, index) => (
    <div key={index}>
      <p><strong>Question:</strong> {question}</p>
      <p><strong>Answer:</strong> {answers[index]}</p>
    </div>
  ));

  return (
    <div>
      {qaPairs}
    </div>
  );
}

export default QAPrinter;