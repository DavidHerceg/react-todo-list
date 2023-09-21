import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Állapotváltozókat meghatároztam a useState hook-ok segítségével.
  const [todayTasks, setTodayTasks] = useState([]);
  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [isTodayChecked, setIsTodayChecked] = useState(false);
  const [isTomorrowChecked, setIsTomorrowChecked] = useState(false);

  // Új teendő létrehozása elem.
  const createTaskItem = (description) => {
    return (
      <li className="list-group-item">
        <div className="task-wrapper">
          <input type="checkbox" className="task-checkbox" />
          {description}
        </div>
      </li>
    );
  };

  //Új teendő hozzáadása a megfelelő listához (Tasks for today/Tasks for tomorrow).
  const addTaskToList = (description, isToday) => {
    if (isToday) {
      setTodayTasks([...todayTasks, createTaskItem(description)]);
    } else {
      setTomorrowTasks([...tomorrowTasks, createTaskItem(description)]);
    }
  };

  // Új teendő mentése.
  const handleSaveTask = () => {
    const trimmedDescription = taskDescription.trim();
    if (trimmedDescription !== '') {
      if (isTodayChecked) {
        addTaskToList(trimmedDescription, true);
      } else if (isTomorrowChecked) {
        addTaskToList(trimmedDescription, false);
      }
      setTaskDescription('');
      setIsTodayChecked(false);
      setIsTomorrowChecked(false);
    }
  };

  // Kiválasztott teendő törlése.
  const handleDeleteTask = () => {
    const selectedTasks = document.querySelectorAll('.task-checkbox:checked');
    selectedTasks.forEach((task) => {
      task.closest('.list-group-item').remove();
    });
  };

  // Funkció a kiválasztott teendők listák közötti mozgatására (Tasks for for today/Tasks for tomorrow).
  const handleMoveTask = (isToday) => {
    const sourceList = isToday ? todayTasks : tomorrowTasks;
    const targetList = isToday ? tomorrowTasks : todayTasks;

    const selectedTasks = Array.from(
      document.querySelectorAll('.task-checkbox:checked')
    );
    selectedTasks.forEach((task) => {
      const listItem = task.closest('.list-group-item');
      listItem.querySelector('.task-checkbox').checked = false;
      targetList.push(createTaskItem(listItem.textContent));
      sourceList.splice(sourceList.indexOf(listItem), 1);
    });

    // Állapot frissítés.
    setTodayTasks([...todayTasks]);
    setTomorrowTasks([...tomorrowTasks]);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">To-Do List</span>
        </div>
      </nav>

      {/* Felső lista */}
      <div className="container mt-4" id="top">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Add New Task</h5>
                <div className="form-group row">
                  <div className="col">
                    <input
                      className="form-control"
                      placeholder="Describe task"
                      type="text"
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col">
                    <div className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isTodayChecked}
                        onChange={() => setIsTodayChecked(!isTodayChecked)}
                      />
                      <label className="form-check-label" htmlFor="todayCheckbox">
                        Today
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isTomorrowChecked}
                        onChange={() =>
                          setIsTomorrowChecked(!isTomorrowChecked)
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="tomorrowCheckbox"
                      >
                        Tomorrow
                      </label>
                    </div>
                    <button
                      className="btn btn-outline-success col-4"
                      onClick={handleSaveTask}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Baloldali és jobboldali lista. */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Tasks for Today</h5>
                <ul className="list-group" id="todayTasks">
                  {todayTasks}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="mb-5">
              <button
                className="btn btn-secondary"
                id="moveLeft"
                onClick={() => handleMoveTask(true)}
              >
                →
              </button>
            </div>
            <div className="mb-5">
              <button
                className="btn btn-secondary"
                id="moveRight"
                onClick={() => handleMoveTask(false)}
              >
                ←
              </button>
            </div>
            <div>
              <button
                className="btn btn-danger"
                id="deleteTask"
                onClick={handleDeleteTask}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Tasks for Tomorrow</h5>
                <ul className="list-group" id="tomorrowTasks">
                  {tomorrowTasks}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
