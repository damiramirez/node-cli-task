const Task = require('../models/Task');
const { getData, saveData } = require('../helpers/fileManager');

class TaskRepository {
  // _tasks = null;

  constructor() {
    const data = getData();
    data ? (this._tasks = data) : (this._tasks = []);
  }

  getAllTasks() {
    return this._tasks;
  }

  createTask(title) {
    const task = new Task(title);
    this._tasks.push(task);
    saveData(this._tasks);
  }

  deleteTask(id) {
    this._tasks = this._tasks.filter((task) => {
      if (!id.includes(task.id)) {
        return task;
      }
    });

    saveData(this._tasks);
  }

  completeTask(id) {
    this._tasks.every((task) => {
      if (id.includes(task.id)) {
        if (!task.done) {
          task.done = true;
          task.finished = new Date().toLocaleString();
        }
      } else {
        task.done = false;
        task.finished = null;
      }
      return task;
    });

    saveData(this._tasks);
  }
}

module.exports = TaskRepository;
