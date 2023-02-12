import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../redux/hooks";


import { Todo, todoAction } from "../redux/todoSlice";
import "../styles/todoList.scss";
 const ToDoListComponent = () => {
  const dispatch = useAppDispatch();
  // let { todoText, todoList, filterTodo, quantity } = useSelector(
  //   (state) => state.todoReducer
  // );
  const { todoText, todoList, filterTodo } = useAppSelector(
    (state) => state.todoReducer
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="todo">
      <div className=" todo__content">
        <h1 className="todo__title">To Do List</h1>
        <div>
          <p>All todo: {todoList.length}</p>
        </div>
      </div>
      <h4 className="todo__title-description">
        If you want to change text, just click on it
      </h4>
      <form className="todo__form" onSubmit={handleSubmit}>
        <div className="form__group field">
          <input
            onChange={(e) => dispatch(todoAction.addText(e.target.value))}
            value={todoText}
            className="todo__form-input form__field"
            name="create"
            type="text"
            id="create"
            placeholder="notification"
          />
          <label htmlFor="create" className="form__label">
            Write
          </label>
        </div>

        <button
          className="todo__form-button"
          onClick={() => dispatch(todoAction.handleClick())}
          type="submit"
        >
          Send
        </button>
        <div className="form__group field">
          <input
            placeholder="notification"
            id="search"
            className="todo__form-input form__field"
            type="text"
            onChange={(e) => dispatch(todoAction.searchNotes(e.target.value))}
          />
          <label htmlFor="search" className="form__label">
            Find something
          </label>
        </div>
      </form>
      <div className="todo__list">
        {todoList
          .filter((note) => note.text.toLowerCase().includes(filterTodo))
          .map(({ id, text, completed, toggleChangeText }: Todo) => (
            <div className="todo__list-wrap">
              {toggleChangeText === false ? (
                <p
                  className="todo__list-text"
                  onClick={(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) =>
                    dispatch(
                      todoAction.isChangedText( {id, event: e.currentTarget.nodeName})
                    )
                  }
                  key={id}
                >
                  {text}
                </p>
              ) : (
                <div className="form__group field">
                  <input
                    id="change"
                    className="todo__list-input"
                    type="text"
                    onBlur={(e) =>
                      dispatch(
                        todoAction.changeTodoText({ id, event: e.target.value })
                      )
                    }
                  />
                  <label htmlFor="change" className="form__label">
                    Click to me for changing!
                  </label>
                </div>
              )}
              <button
                className="todo__list-button"
                onClick={() => dispatch(todoAction.deleteTodo(id))}
              >
                Delete
              </button>
              <div className="checkbox">
                <input
                  id={id }
                  className="todo__list-checkbox checkbox-item"
                  type="checkbox"
                  checked={completed}
                  onChange={() =>
                    dispatch(todoAction.handleChangeCompleted(id))
                  }
                />
                <label htmlFor={id  }></label>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ToDoListComponent