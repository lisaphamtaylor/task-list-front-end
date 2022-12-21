import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import './TaskList.css';

const TaskList = (props) => {
  const getTaskListJSX = props.tasks.map((task,index) => {
    return (
      <ul key={index}>
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          onCompleteTask={props.onCompleteTask}
          onDeleteTask={props.onDeleteTask}
        />
      </ul>
    );
  });

  return <ul className="tasks__list no-bullet">{getTaskListJSX}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool,
    })
  ),
  onCompleteTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default TaskList;
