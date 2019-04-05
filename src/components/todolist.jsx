import React from "react";
import Task from "./task.jsx";
const TodoList = ({ items, onDelete, onDone }) => {
  return (
    // <div className="container">
    <div className="list-group">
      {items.map(item => (
        <Task item={item} onDelete={onDelete} onDone={onDone} key={item.id} />
      ))}
    </div>
    // </div>
  );
};

export default TodoList;
