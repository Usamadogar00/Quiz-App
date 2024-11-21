"use client";

import Image from "next/image";
import quizData from "../data/quiz.json";
import { useState } from "react";

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
      <div style={{ backgroundColor: "black", color: "white", padding: "10px" }}>
        <h1>Phone Quiz</h1>
        {!isQuizComplete && (
          <p>
            Question {currentQuestionIndex + 1} of {quizData.length}
          </p>
        )}
      </div>

      {!isQuizComplete ? (
        <>
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <h2>{currentQuestion.question}</h2>
        
            <Image
              src={`${currentQuestion.image}`} // Ensure this matches the `public` directory
              alt={currentQuestion.question}
              width={200}
              height={200}
              style={{ borderRadius: "10px", marginRight: "auto", marginLeft: "auto" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                style={{
                  padding: "10px",
                  color: "black",
                  backgroundColor: selectedOption === option ? "#35ad3e" : "#f0f0f0",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {option}
              </button>
            ))}
          </div>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <progress value={currentQuestionIndex} max={quizData.length} />
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={handleNextQuestion}
              style={{
                padding: "10px 20px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              disabled={!selectedOption}
            >
              {currentQuestionIndex < quizData.length - 1 ? "Next Question" : "Finish Quiz"}
            </button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>Quiz Completed!</h2>
          <p>
            You scored {score} out of {quizData.length}.
          </p>
          <p>
            Click here to play again
            <p>
            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setScore(0);
                setIsQuizComplete(false);
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              Restart Quiz
            </button>
          </p>
          </p>
        </div>
      )}
    </div>
  );
}