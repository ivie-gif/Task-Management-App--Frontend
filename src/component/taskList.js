import React from 'react';
import Task from './task';

const TaskList = ({ tasks, onDelete, onEdit, onComplete }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} onComplete={onComplete}/>
      ))}
    </div>
  );
};

export default TaskList;
