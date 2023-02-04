import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { todoAction } from "../redux/todoSlice";
import "../styles/todoList.scss";
export const ToDoListComponent = () => {
  const dispatch = useDispatch();
  let { todoText, todoList, filterTodo } = useSelector(
    (state) => state.todoReducer
  );

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <h4 className="todo__title-description">
        If you want to change text, just click on it
      </h4>
      <form className="todo__form" onSubmit={handleSubmit}>
        <label className="todo__form-label">
          Write
          <input
            onChange={(e) => dispatch(todoAction.addText(e.target.value))}
            value={todoText}
            className="todo__form-input"
            name="todo"
            type="text"
            placeholder="notification"
          />
        </label>
        <button
          className="todo__form-button"
          onClick={(e) => dispatch(todoAction.handleClick())}
          type="submit"
        >
          Send
        </button>
        <input
          className="todo__form-input"
          type="text"
          onChange={(e) => dispatch(todoAction.searchNotes(e.target.value))}
        />
      </form>
      <div className="todo__list">
        {todoList
          .filter((note) => note.text.toLowerCase().includes(filterTodo))
          .map(({ id, text, completed, toggleChangeText }) => (
            <div className="todo__list-wrap">
              {toggleChangeText === false ? (
                <p
                  className="todo__list-text"
                  onClick={(e) =>
                    dispatch(
                      todoAction.isChangedText({ id, event: e.target.nodeName })
                    )
                  }
                  key={id}
                >
                  {text}
                </p>
              ) : (
                <input
                  className="todo__list-input"
                  type="text"
                  onBlur={(e) =>
                    dispatch(
                      todoAction.changeTodoText({ id, event: e.target.value })
                    )
                  }
                />
              )}
              <button
                className="todo__list-button"
                onClick={() => dispatch(todoAction.deleteTodo(id))}
              >
                Delete
              </button>
              <div className="checkbox">
                <input
                  id={id}
                  className="todo__list-checkbox checkbox-item"
                  type="checkbox"
                  checked={completed}
                  onChange={() =>
                    dispatch(todoAction.handleChangeCompleted(id))
                  }
                />
                <label for={id}></label>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
