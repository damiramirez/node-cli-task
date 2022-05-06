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

  /**
   *
   * @param {String} title
   *
   * TODO: Falta persisir datos
   */
  createTask(title) {
    const task = new Task(title);
    this._tasks.push(task);
    saveData(this._tasks);
  }

  deleteTask(id) {
    return this._tasks.filter((task) => task.id !== id);
  }

  completeTask(id) {
    this._tasks.every((task, index) => {
      if (id.includes(task.id)) {
        task.done = !task.done;
      }
      return task;
    });

    // this._tasks.map((task) => {
    //   if (task.id === id) {
    //     task.done = !task.done;
    //   }
    //   return task;
    // });
    saveData(this._tasks);
  }
}

module.exports = TaskRepository;
