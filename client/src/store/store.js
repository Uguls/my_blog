import { createStore, combineReducers } from "redux";

// 액션 타입 정의
const INIT_DIARY = "INIT_DIARY";
const CREATE_DIARY = "CREATE_DIARY";
const UPDATE_DIARY = "UPDATE_DIARY";
const DELETE_DIARY = "DELETE_DIARY";

const INIT_TODOS = "INIT_TODOS";
const CREATE_TODO = "CREATE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const DELETE_TODO = "DELETE_TODO";

// 액션 크리에이터 정의
export const initDiary = (data) => ({
  type: INIT_DIARY,
  data,
});

export const createDiary = (data) => ({
  type: CREATE_DIARY,
  data,
});

export const updateDiary = (data) => ({
  type: UPDATE_DIARY,
  data,
});

export const deleteDiary = (id) => ({
  type: DELETE_DIARY,
  id,
});

export const initTodos = (data) => ({
  type: INIT_TODOS,
  data,
});

export const createTodo = (newItem) => ({
  type: CREATE_TODO,
  newItem,
});

export const updateTodo = (targetId) => ({
  type: UPDATE_TODO,
  targetId,
});

export const deleteTodo = (targetId) => ({
  type: DELETE_TODO,
  targetId,
});

// 초기 상태
const initialDiaryState = {
  diary: [],
};

const initialTodoState = {
  todos: [],
};

// 리듀서 정의
const diaryReducer = (state = initialDiaryState, action) => {
  let nextState;

  switch (action.type) {
    case INIT_DIARY: {
      return { ...state, diary: action.data };
    }
    case CREATE_DIARY: {
      nextState = [action.data, ...state.diary];
      break;
    }
    case UPDATE_DIARY: {
      nextState = state.diary.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item,
      );
      break;
    }
    case DELETE_DIARY: {
      nextState = state.diary.filter(
        (item) => String(item.id) !== String(action.id),
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));
  return { ...state, diary: nextState };
};

const todoReducer = (state = initialTodoState, action) => {
  let nextState;

  switch (action.type) {
    case INIT_TODOS: {
      return { ...state, todos: action.data };
    }
    case CREATE_TODO: {
      nextState = [action.newItem, ...state.todos];
      break;
    }
    case UPDATE_TODO: {
      nextState = state.todos.map((it) =>
        it.id === action.targetId
          ? {
              ...it,
              isDone: !it.isDone,
            }
          : it,
      );
      break;
    }
    case DELETE_TODO: {
      nextState = state.todos.filter((it) => it.id !== action.targetId);
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("todos", JSON.stringify(nextState));
  return { ...state, todos: nextState };
};

// 리덕스 스토어 생성
const rootReducer = combineReducers({
  diary: diaryReducer,
  todo: todoReducer,
});

export const store = createStore(rootReducer);
