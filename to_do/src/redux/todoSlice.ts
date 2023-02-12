
/*eslint arrow-body-style: ["error", "as-needed"]*/
/*eslint-env es6*/
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./reducer";
import swal from "sweetalert";


export type Todo = {
  id: any,
          text: string,
          completed:boolean,
          toggleChangeText: boolean,
}
let todoListStorage =
  localStorage.getItem("todoList" ) !== null 
    ?  JSON.parse(localStorage.getItem("todoList")!)
    : [];

interface TodoState  {
  todoText:string,
  todoList: Todo[],
  completed: boolean,
  toggleChangeText: boolean;
  filterTodo: string,
  quantity: number,
}


let initialState: TodoState = {
  todoText: "",
  todoList: [],
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

    handleClick(state, ) {
       

      if (state.todoText !== "") {
        const id = state.todoList.length
          ?   Number([...state.todoList].pop()!.id) + 1
          : 1;
        let todo: Todo = {
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

    deleteTodo(state, action: PayloadAction<Todo['id']>) {
        //  state.todoList = todoListStorage ;
      let newNote = state.todoList.filter((note) => note.id !== action.payload);
      state.todoList = newNote;
  
      
      localStorage.setItem("todoList", JSON.stringify(state.todoList));
  return 
    },

    handleChangeCompleted(state,  action: PayloadAction<Todo['id']>) {
      let isCompleted = state.todoList.find((note) => note.id === action.payload);

      isCompleted!.completed = !isCompleted!.completed;
    },

    isChangedText(state, action) {
      if (action.payload.event === "P") {
        const changeText = state.todoList.find(
          (note) => note.id === action.payload.id
        );

        changeText!.toggleChangeText = true;
      }
    },

    changeTodoText(state, { payload }) {
      if (payload.event !== "") {
        const changeText = state.todoList.find(
          (note) => note.id === payload.id
        );

        changeText!.toggleChangeText = !changeText!.toggleChangeText;
        changeText!.text = payload.event;

        return;
      }
      swal("You should enter at least one symbol!");
    },

    searchNotes(state, { payload }) {
      state.filterTodo = payload;
    },
  },
});
export const selectCount = (state: RootState) => state.todoReducer
export const { reducer: todoReducer, actions: todoAction } = todoSlice;
