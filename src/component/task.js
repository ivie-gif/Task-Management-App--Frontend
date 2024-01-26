import React, { useState, useRef } from "react";

const Task = ({ task, onDelete, onEdit, onComplete }) => {
  const [editForm, setEditForm] = useState("");
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  return (
    <div>
      <h3
        contentEditable={editForm === task.id && "true"}
        style={{
          border: editForm === task.id && "1px solid black",
          textDecoration: task.completed === "true" && "line-through",
        }}
        ref={titleRef}
      >
        {task.title}
      </h3>
      <p
        contentEditable={editForm === task.id && "true"}
        style={{
          border: editForm === task.id && "1px solid black",
          textDecoration: task.completed === "true" && "line-through",
        }}
        ref={descriptionRef}
      >
        {task.description}
      </p>
      <button
        onClick={() => onDelete(task.id)}
        style={{
          marginRight: "10px",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "2px solid red",
          backgroundColor: "red",
          color: "white",
          cursor: "pointer",
        }}
      >
        Delete 
      </button>

      <button
        onClick={() => setEditForm(task.id)}
        style={{
          marginRight: "10px",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "2px solid green",
          backgroundColor: "green",
          color: "white",
          cursor: "pointer",
        }}
        disabled={task.completed === "true"}
      >
        Edit
      </button>

      {editForm === task.id && (
        <button
          onClick={() =>
            onEdit({
              id: task.id,
              title: titleRef.current?.textContent,
              description: descriptionRef.current.textContent,
            })
          }
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "2px solid green",
            backgroundColor: "green",
            color: "white",
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>
      )}
      {task.completed === "false" && (
        <button
          onClick={() => onComplete(task.id)}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "2px solid green",
            backgroundColor: "green",
            color: "white",
            cursor: "pointer",
          }}
        >
          Completed
        </button>
      )}
    </div>
  );
};

export default Task;
