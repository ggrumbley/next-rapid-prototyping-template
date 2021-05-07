import { atom, selector } from 'recoil';

export const TODO_LIST_STATE = 'TODO_LIST_STATE';
export const TODO_LIST_FILTER_STATE = 'TODO_LIST_FILTER_STATE';
export const FILTERED_TODO_LIST_STATE = 'FILTERED_TODO_LIST_STATE';
export const TODO_LIST_STATS_STATE = 'TODO_LIST_STATS_STATE';
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

export const todoListFilterState = atom({
  key: TODO_LIST_FILTER_STATE,
  default: filterStates.SHOW_ALL,
});

export const filteredTodoListState = selector({
  key: FILTERED_TODO_LIST_STATE,
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case filterStates.SHOW_COMPLETED:
        return list.filter((item: TodoItem) => item.isComplete);
      case filterStates.SHOW_UNCOMPLETED:
        return list.filter((item: TodoItem) => !item.isComplete);
      default:
        return list;
    }
  },
});

export const todoListStatsState = selector({
  key: TODO_LIST_STATS_STATE,
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item: TodoItem) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
