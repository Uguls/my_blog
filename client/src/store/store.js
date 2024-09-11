import { configureStore, createSlice } from "@reduxjs/toolkit";

// 로컬 스토리지에 상태 저장
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

// 로컬 스토리지에서 상태 불러오기
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

// 초기 상태
const initialDiaryState = [];
const initialTodoState = [];

// 다이어리 Slice 정의
const diarySlice = createSlice({
  name: 'diary',
  initialState: initialDiaryState,
  reducers: {
    initDiary(state, action) {
      return [...action.payload];
    },
    createDiary(state, action) {
      state.unshift(action.payload);
    },
    updateDiary(state, action) {
      console.log(action.payload);
      return state.map((item) => String(item.id) === String(action.payload.id) ? action.payload : item);
    },
    deleteDiary(state, action) {
      return state.filter((item) => String(item.id) !== String(action.payload));
    },
  },
});

// Todo Slice 정의
const todoSlice = createSlice({
  name: 'todo',
  initialState: initialTodoState,
  reducers: {
    initTodo(state, action) {
      return action.payload;
    },
    createTodo(state, action) {
      state.unshift(action.payload);
    },
    updateTodo(state, action) {
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, isDone: !item.isDone }
          : item
      );
    },
    deleteTodo(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

// 액션 추출
export const {
  initDiary, createDiary, updateDiary, deleteDiary
} = diarySlice.actions;

export const {
  initTodo, createTodo, updateTodo, deleteTodo
} = todoSlice.actions;

// 로컬 스토리지에서 초기 상태 불러오기
const persistedState = loadStateFromLocalStorage() || {};

// 리덕스 스토어 생성
const store = configureStore({
  reducer: {
    diary: diarySlice.reducer,
    todo: todoSlice.reducer,
  },
  preloadedState: persistedState,
});

// 스토어 상태가 변경될 때마다 로컬 스토리지에 저장
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export { store };
