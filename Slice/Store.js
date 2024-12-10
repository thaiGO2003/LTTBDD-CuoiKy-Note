import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './Slice';  // Đảm bảo rằng đường dẫn này đúng với cấu trúc thư mục của bạn

const store = configureStore({
  reducer: {
    todos: todosReducer,  // Đưa todosReducer vào trong store
  },
});

export default store;
