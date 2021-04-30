import { atom, selector } from 'recoil';

export const TODO_LIST_STATE = 'TODO_LIST_STATE';
export const TODO_LIST_FILTER_STATE = 'TODO_LIST_FILTER_STATE';

export interface TodoItem {
  id: number;
  text: string;
  isComplete: boolean;
}

export const todoListState = atom({
  key: TODO_LIST_STATE,
  default: [],
});
