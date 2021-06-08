import React from 'react';
import { Answer } from '../types';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: Answer | undefined;
  questionNum: number;
  totalQuestions: number;
};

const selectBackgroundClass = (userAnswer: Answer | undefined, answer: string): string | null => {
  userAnswer?.correctAnswer === answer ? 'correct' : null;
  if (userAnswer?.correctAnswer === answer) {
    return 'correct-answer';
  }
  if (userAnswer?.answer === answer) {
    return 'wrong-answer';
  }

  return null;
};
export const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestions,
}) => {
  return (
    <div className="question-card">
      <p className="text-2xl mb-4 text-blue-700">
        Question: {questionNum} / {totalQuestions}
      </p>
      <p className="text-base text-blue-700" dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers?.map((answer) => (
          <div className="button-wrapper" key={answer}>
            <button
              className={`answer-button ${selectBackgroundClass(userAnswer, answer)}`}
              disabled={!!userAnswer}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
