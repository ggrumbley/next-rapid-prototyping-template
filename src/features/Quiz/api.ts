import { Question, Difficulty, QuestionsState } from './types';
import { $fetch } from '../../utils';

export const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty,
): Promise<QuestionsState[]> => {
  const QUIZ_API_URL = `/opentdb/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

  const data = await $fetch.get(QUIZ_API_URL);

  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
  }));
};
