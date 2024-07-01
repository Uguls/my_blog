import { createStore, combineReducers } from "redux";
import { jwtDecode } from 'jwt-decode';

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

// JWT를 쿠키에서 가져오기
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

// 초기 상태
const initialDiaryState = [];
const initialTodoState = [];
const initialLoginState = {
  isAuthenticated: false,
  user: null,
  isAdmin: false,
};

// 로그인 액션 크리에이터 정의
export const setLogin = (user, isAdmin) => ({
  type: "SET_AUTH",
  payload: { user, isAdmin },
});

export const logout = () => ({
  type: "LOGOUT",
});

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

// 리듀서 정의
const authReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        isAuthenticated: !!action.payload.user,
        user: action.payload.user,
        isAdmin: action.payload.isAdmin,
      };
    case "LOGOUT":
      return initialLoginState;
    default:
      return state;
  }
};

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
  login: authReducer,
});

// 로컬 스토리지에서 초기 상태 불러오기 및 JWT 디코딩
const persistedState = loadStateFromLocalStorage() || {};
const token = getCookie('jwt');
if (token) {
  const decoded = jwtDecode(token);
  persistedState.login = {
    isAuthenticated: true,
    user: { id: decoded.id, email: decoded.email },
    isAdmin: decoded.role === 'admin',
  };
}

const store = createStore(
  rootReducer,
  persistedState
);

// 스토어 상태가 변경될 때마다 로컬 스토리지에 저장
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export { store };
