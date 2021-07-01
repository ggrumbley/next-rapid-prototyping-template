import React from 'react';
import { QuestionCard } from './components/QuestionCard';
import { Spinner } from 'components/Spinner';
import { useStore, Actions } from './Quiz.state';
import { fetchQuizQuestions } from './api';
import { Difficulty } from './types';

export const TOTAL_QUESTIONS = 10;

export const Quiz: React.FC = () => {
  const {
    state: { questions, questionNumber, userAnswers, score, gameOver, loading },
    dispatch,
  } = useStore();

  const startTrivia = async () => {
    dispatch({ type: Actions.TOGGLE_LOADING });
    dispatch({ type: Actions.RESET_GAME });
    // Fetch new Quiz Questions and Answers
    const payload = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    // Set new Quiz Questions and Answers in State
    dispatch({ type: Actions.SET_QUESTIONS, payload });
    dispatch({ type: Actions.TOGGLE_LOADING });
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (gameOver) return;

    const answer = e.currentTarget.value;
    const question = questions[questionNumber].question;
    const correctAnswer = questions[questionNumber].correct_answer;
    const correct = questions[questionNumber].correct_answer === answer;

    if (correct) dispatch({ type: Actions.INCREMENT_SCORE });

    const userAnswer = {
      question,
      answer,
      correct,
      correctAnswer,
    };

    dispatch({ type: Actions.SET_USER_ANSWERS, payload: userAnswer });
  };

  const nextQuestion = () => {
    const nextQ = questionNumber + 1;

    nextQ === TOTAL_QUESTIONS
      ? dispatch({ type: Actions.SET_GAME_OVER, payload: true })
      : dispatch({ type: Actions.SET_QUESTION_NUMBER, payload: nextQ });
  };

  const isReadyForNextQuestion = () =>
    !gameOver &&
    !loading &&
    userAnswers.length === questionNumber + 1 &&
    questionNumber !== TOTAL_QUESTIONS - 1;

  return (
    <div className="flex flex-col items-center">
      <h1>React Quiz</h1>
      {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
        <button className="start max-w-xs" onClick={startTrivia}>
          Start
        </button>
      )}

      {!gameOver && <p className="text-white text-4xl mt-0 mb-6">Score: {score}</p>}
      {loading && <Spinner />}
      {!loading && !gameOver && (
        <QuestionCard
          questionNum={questionNumber + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[questionNumber]?.question}
          answers={questions[questionNumber]?.answers}
          userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
          callback={checkAnswer}
        />
      )}
      {isReadyForNextQuestion() && (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      )}
    </div>
  );
};
