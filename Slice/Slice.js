import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('https://671b63d32c842d92c37fafec.mockapi.io/api/v1/todo');
    const data = await response.json();
    return data;
  }
);

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);  // Thêm mới todo vào state
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;  // Cập nhật todo trong state
      }
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
     toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.checked = !todo.checked;  // Toggle trạng thái checked của todo
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addTodo, updateTodo, removeTodo , toggleTodo} = todosSlice.actions;

export default todosSlice.reducer;
