import { createStore, combineReducers } from "redux";

// 다이어리 액션 크리에이터 정의
export const initDiary = (data) => ({
  type: "INIT_DIARY",
  data,
});

export const createDiary = (data) => ({
  type: "CREATE_DIARY",
  data,
});

export const updateDiary = (data) => ({
  type: "UPDATE_DIARY",
  data,
});

export const deleteDiary = (id) => ({
  type: "DELETE_DIARY",
  id,
});

// Todo 액션 크리에이터 정의
export const initTodo = (data) => ({
  type: "INIT_TODO",
  data,
});

export const createTodo = (data) => ({
  type: "CREATE_TODO",
  data,
});

export const updateTodo = (id) => ({
  type: "UPDATE_TODO",
  id,
});

export const deleteTodo = (id) => ({
  type: "DELETE_TODO",
  id,
});

// 초기 상태
const initialDiaryState = [];
const initialTodoState = [];

// 리듀서 정의
const diaryReducer = (state = initialDiaryState, action) => {
  let nextState;

  switch (action.type) {
    case "INIT_DIARY": {
      return [...action.data];
    }
    case "CREATE_DIARY": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE_DIARY": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item,
      );
      break;
    }
    case "DELETE_DIARY": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));
  return [...nextState];
};

const todoReducer = (state = initialTodoState, action) => {
  let nextState;

  switch (action.type) {
    case "INIT_TODO":
      return action.data;
    case "CREATE_TODO": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE_TODO": {
      nextState = state.map((item) =>
        item.id === action.id
          ? {
              ...item,
              isDone: !item.isDone,
            }
          : item,
      );
      break;
    }
    case "DELETE_TODO": {
      nextState = state.filter((item) => item.id !== action.id);
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("Todo", JSON.stringify(nextState));
  return nextState;
};

// 리덕스 스토어 생성
const rootReducer = combineReducers({
  diary: diaryReducer,
  todo: todoReducer,
});

export const store = createStore(rootReducer);
