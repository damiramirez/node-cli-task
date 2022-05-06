const Task = require('../models/Task');

class TaskRepository {
  // _tasks = null;

  constructor() {
    this._tasks = [];
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
  }

  deleteTask(id) {
    return this._tasks.filter((task) => task.id !== id);
  }

  completeTask(id) {}
}

module.exports = TaskRepository;
