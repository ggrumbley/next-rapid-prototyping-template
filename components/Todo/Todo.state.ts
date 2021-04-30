import { atom, selector } from 'recoil';

export const TODO_LIST_STATE = 'TODO_LIST_STATE';
export const TODO_LIST_FILTER_STATE = 'TODO_LIST_FILTER_STATE';

enum filterStates {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_UNCOMPLETED = 'SHOW_UNCOMPLETED',
}

export interface TodoItem {
  id: number;
  text: string;
  isComplete: boolean;
}

export const todoListState = atom({
  key: TODO_LIST_STATE,
  default: [],
});

export const filteredTodoListState = atom({
  key: TODO_LIST_FILTER_STATE,
  default: filterStates.SHOW_ALL,
});
