import React, { createContext, useReducer, useContext, useMemo } from 'react';
import produce from 'immer';

export enum Actions {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  INCREMENT_BY_AMOUNT = 'INCREMENT_BY_AMOUNT',
}

type StoreState = {
  value: number;
};

export const INITIAL_STATE = {
  value: 1984,
};

export const storeReducer = produce((draft, action) => {
  switch (action.type) {
    case Actions.INCREMENT:
      draft.value += 1;
      break;
    case Actions.DECREMENT:
      draft.value -= 1;
      break;
    case Actions.INCREMENT_BY_AMOUNT:
      draft.value += action.payload;
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
