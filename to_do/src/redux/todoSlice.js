/*eslint arrow-body-style: ["error", "as-needed"]*/
/*eslint-env es6*/
import { createSlice } from "@reduxjs/toolkit";
import swal from "sweetalert";

let todoList =
  localStorage.getItem("todoList") !== null
    ? JSON.parse(localStorage.getItem("todoList"))
    : [];

let initialState = {
  todoText: "",
  todoList: todoList,
  completed: false,
  toggleChangeText: false,
  filterTodo: "",
  quantity: 0,
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addText(state, { payload }) {
      state.todoText = payload;
    },

    handleClick(state, action) {
      if (state.todoText !== "") {
        const id = state.todoList.length
          ? Number([...state.todoList].pop().id) + 1
          : 1;
        let todo = {
          id: id,
          text: state.todoText,
          completed: state.completed,
          toggleChangeText: state.toggleChangeText,
        };

        state.todoList.push({ ...todo });
        state.todoText = "";
      }
      localStorage.setItem("todoList", JSON.stringify(state.todoList));
      return;
    },

    deleteTodo(state, { payload }) {
      let newNote = state.todoList.filter((note) => note.id !== payload);

      state.todoList = newNote;
      todoList = state.todoList;
      localStorage.setItem("todoList", JSON.stringify(state.todoList));
    },

    handleChangeCompleted(state, { payload }) {
      let isCompleted = state.todoList.find((note) => note.id === payload);

      isCompleted.completed = !isCompleted.completed;
    },

    isChangedText(state, { payload }) {
      if (payload.event === "P") {
        const changeText = state.todoList.find(
          (note) => note.id === payload.id
        );

        changeText.toggleChangeText = true;
      }
    },

    changeTodoText(state, { payload }) {
      if (payload.event !== "") {
        const changeText = state.todoList.find(
          (note) => note.id === payload.id
        );

        changeText.toggleChangeText = !changeText.toggleChangeText;
        changeText.text = payload.event;

        return;
      }
      swal("You should enter at least one symbol!");
    },

    searchNotes(state, { payload }) {
      state.filterTodo = payload;
    },
  },
});

export const { reducer: todoReducer, actions: todoAction } = todoSlice;
