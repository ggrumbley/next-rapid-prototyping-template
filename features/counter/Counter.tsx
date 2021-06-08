import React, { useState } from 'react';

import { useStore, Actions } from './Counter.state';
import { $fetch } from '../../utils';
import styles from './Counter.module.css';

export const Counter = () => {
  const {
    state: { value },
    dispatch,
  } = useStore();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  const incrementIfOdd = (value: number) => {
    if (value % 2 !== 1) return;

    dispatch({ type: Actions.INCREMENT, payload: value });
  };

  const incrementAsync = async (amount: number) => {
    const { data } = await $fetch.post('/api/counter', { body: { amount } });
    dispatch({ type: Actions.INCREMENT_BY_AMOUNT, payload: data });
  };

  return (
    <div className="rounded-md p-12 border-2 border-indigo-500 shadow-md bg-indigo-50">
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch({ type: Actions.DECREMENT })}
        >
          -
        </button>
        <span className={styles.value}>{value}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch({ type: Actions.INCREMENT })}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch({ type: Actions.INCREMENT_BY_AMOUNT, payload: incrementValue })}
        >
          Add Amount
        </button>
        <button className={styles.asyncButton} onClick={() => incrementAsync(incrementValue)}>
          Add Async
        </button>
        <button className={styles.button} onClick={() => incrementIfOdd(value)}>
          Add If Odd
        </button>
      </div>
    </div>
  );
};
