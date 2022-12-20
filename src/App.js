import React from 'react';
import { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

const kBaseUrl = 'https://task-list-api-c17.herokuapp.com';

const taskApiToJson = (task) => {
  const { id, is_complete: isComplete, title } = task;

  return { id, isComplete, title };
};

const getTasksApi = () => {
  return axios
    .get(`${kBaseUrl}/tasks`)
    .then((response) => {
      return response.data.map(taskApiToJson);
    })
    .catch((error) => {
      console.log(error);
      throw new Error('error fetching tasks');
    });
};

const updateTaskApi = (id, markComplete) => {
  const endpoint = markComplete ? 'mark_complete' : 'mark_incomplete';

  return axios
    .patch(`${kBaseUrl}/tasks/${id}/${endpoint}`)
    .then((response) => {
      return taskApiToJson(response.data.task);
    })
    .catch((error) => {
      console.log(error);
      throw new Error(`error updating task ${id}`);
    });
};

const deleteTaskApi = (id) => {
  return axios.delete(`${kBaseUrl}/tasks/${id}`).catch((error) => {
    console.log(error);
    throw new Error(`error deleting task ${id}`);
  });
};

const App = () => {
  const [taskData, setTaskData] = useState([
    {
      id: 1,
      title: 'Mow the lawn',
      isComplete: false,
    },
    {
      id: 2,
      title: 'Cook Pasta',
      isComplete: true,
    },
  ]);

  useEffect(() => {
    refreshTasks();
  }, []);

  const refreshTasks = () => {
    return getTasksApi()
      .then((tasks) => {
        setTaskData(tasks);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const completeTask = (id) => {

    
    return updateTaskApi(id, !task.isComplete)
    .then(newTasks = taskData.map((task) => {
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete };
      } else {
        return task;
      }
      });
      setTaskData(newTasks);
    );
  };

  const deleteTask = (id) => {
    setTaskData((taskData) =>
      taskData.filter((task) => {
        return task.id !== id;
      })
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <TaskList
          tasks={taskData}
          onCompleteTask={completeTask}
          onDeleteTask={deleteTask}
        ></TaskList>
      </main>
    </div>
  );
};

export default App;
