import React, { createContext, useReducer, useContext, useMemo } from 'react';
import produce from 'immer';

import { Answer, QuestionsState } from './types';

export enum Actions {
  TOGGLE_LOADING = 'TOGGLE_LOADING',
  FETCH_QUESTIONS = 'FETCH_QUESTIONS',
  SET_QUESTION_NUMBER = 'SET_QUESTION_NUMBER',
  SET_USER_ANSWERS = 'SET_USER_ANSWERS',
  RESET_GAME = 'RESET_GAME',
  INCREMENT_SCORE = 'INCREMENT_SCORE',
  SET_GAME_OVER = 'SET_GAME_OVER',
  SET_QUESTIONS = 'SET_QUESTIONS',
}

type StoreState = {
  loading: boolean;
  questions: QuestionsState[];
  questionNumber: number;
  userAnswers: Answer[];
  score: number;
  gameOver: boolean;
};

export const INITIAL_STATE: StoreState = {
  loading: false,
  questions: [],
  questionNumber: 0,
  userAnswers: [],
  score: 0,
  gameOver: true,
};

export const storeReducer = produce((draft, action) => {
  switch (action.type) {
    case Actions.TOGGLE_LOADING:
      draft.loading = !draft.loading;
      break;
    case Actions.INCREMENT_SCORE:
      draft.score += 1;
      break;
    case Actions.SET_GAME_OVER:
      draft.gameOver = action.payload;
      break;
    case Actions.SET_QUESTION_NUMBER:
      draft.questionNumber = action.payload;
      break;
    case Actions.SET_QUESTIONS:
      draft.questions = action.payload;
      break;
    case Actions.SET_USER_ANSWERS:
      draft.userAnswers.push(action.payload);
      break;
    case Actions.RESET_GAME:
      draft.userAnswers = [];
      draft.gameOver = false;
      draft.score = 0;
      draft.questionNumber = 0;
      break;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}, INITIAL_STATE);

/*
  Setup Store Provider
  Setup useStore Context
  Export Both
*/
type ContextType = {
  state: StoreState;
  dispatch?: any;
};

const StoreContext = createContext<ContextType>({ state: { ...INITIAL_STATE } });

export const StoreProvider: React.FC = ({ children }) => {
  // Get state and dispatch from Reacts new API useReducer.
  const [state, dispatch] = useReducer(storeReducer, INITIAL_STATE);

  const storeValue = useMemo(() => {
    // Debug Logging
    // console.info('STATE =>', state);
    // console.info('DISPATCH =>', dispatch);

    return { state, dispatch };
  }, [state, dispatch]);

  // Render state, dispatch and special case actions
  return <StoreContext.Provider value={storeValue}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
