import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "../src/component/taskList";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchingList, setFetchingList] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else {
      setDescription(value);
    }
  };

  useEffect(() => {
    setFetchingList(true);
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        setFetchingList(false);
        return setTasks(response.data.tasks);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleDelete = (taskId) => {
    axios
      .delete(`http://localhost:5000/tasks/${taskId}`)
      .then(() => setTasks(tasks.filter((task) => task.id !== taskId)))
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleEdit = ({ id, title, description }) => {
    axios
      .put(`http://localhost:5000/tasks/${id}`, { title, description })
      .then((response) =>{
        window.location.reload()
         return setTasks(tasks.map((task) => (task.id === id ? response.data : task)))
      })
      .catch((error) => console.error("Error completing task:", error));
  };

  const handleComplete = (id) => {
    axios
      .put(`http://localhost:5000/completed/${id}`)
      .then((response) => {
        window.location.reload();
        return setMessage("task completed");
      })
      .catch((error) => console.error("Error completing task:", error));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios
      .post(`http://localhost:5000/tasks/`, { title, description })
      .then((response) => {
        setIsSubmitting(false);
        window.location.reload();
        return setMessage("created successfully");
      })
      .catch((error) => console.error("Error completing task:", error));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "15px",
        width: "40%",
        height: "auto",
        margin: "20px auto",
        backgroundColor: ' #73A580',
        borderRadius: '10px'
      }}
    >
      <h1>Task Management App</h1>
      <form method="post" style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Enter Title"
          onChange={handleChange}
          value={title}
          name="title"
          style={{
            marginRight: "10px",
            padding: "10px 2px",
            borderRadius: "5px",
            border: "2px solid green",
          }}
        />
        <input
          type="text"
          placeholder="Enter Description"
          onChange={handleChange}
          value={description}
          name="description"
          style={{
            marginRight: "10px",
            padding: "10px 2px",
            borderRadius: "5px",
            border: "2px solid green",
          }}
        />
        <button
          onClick={handleAdd}
          type="submit"
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
          {" "}
          {isSubmitting ? "Please Wait" : "Add Task"}
        </button>
      </form>
      {fetchingList ? (
        "Please wait"
      ) : tasks.length === 0 ? (
        "No Task Found"
      ) : (
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
};

export default App;
