import React, { useEffect, useState } from "react";
import swal from "sweetalert";
export const ToDoListComponent = () => {
  let [todoText, setTodoText] = useState("");
  let [completed, setCompleted] = useState(false);
  let [notes, setNotes] = useState([]);

  const handleClick = (e) => {
    if (todoText !== "") {
      const id = notes.length ? Number([...notes].pop().id) + 1 : 1;
      let todo = {
        id: id,
        text: todoText,
        completed: completed,
        changeText: false,
      };

      setNotes([...notes, todo]);
      setTodoText("");
    }
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const deleteTodo = (id) => {
    const newNote = notes.filter((note) => {
      return note.id !== id;
    });
    setNotes(newNote);
  };
  const handleChangeCompleted = (id) => {
    setNotes(
      notes.map((note) => {
        return note.id === id ? { ...note, completed: !note.completed } : note;
      })
    );
  };
  const searchNotes = (e) => {
    console.log(e.target.value);
    const filtered = notes.filter((note) =>
      note.text.toLowerCase().includes(e.target.value)
    );

    setNotes(filtered);
  };
  const changeTodoText = (id, event) => {
    if (event !== "") {
      setNotes(
        notes.map((note) => {
          return note.id === id
            ? { ...note, text: event, changeText: false }
            : note;
        })
      );
    }
    swal("You should enter at least one symbol!");
  };
  const isChangedText = (id, event) => {
    if (event === "P") {
      setNotes(
        notes.map((note) => {
          return note.id === id ? { ...note, changeText: true } : note;
        })
      );
    }
  };
  return (
    <div className="todo">
      <h1>To Do List</h1>
      <h4>If you want to change text, just click on it</h4>
      <form onSubmit={handleSubmit}>
        <label className="">
          Write
          <input
            onChange={(e) => setTodoText(e.currentTarget.value)}
            value={todoText}
            className=""
            name="todo"
            type="text"
            placeholder="notification"
          />
        </label>
        <button onClick={handleClick} type="submit">
          Send
        </button>
        <input type="text" onChange={searchNotes} />
      </form>
      <div>
        {notes.map(({ id, text, completed, changeText }) => (
          <div>
            {changeText === false ? (
              <p onClick={(e) => isChangedText(id, e.target.nodeName)} key={id}>
                {text}
              </p>
            ) : (
              <input
                type="text"
                onBlur={(e) => changeTodoText(id, e.target.value)}
              />
            )}
            <button onClick={() => deleteTodo(id)}>Delete</button>
            <input
              type="checkbox"
              checked={completed}
              onChange={() => handleChangeCompleted(id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
