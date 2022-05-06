require('colors');

const {
  inquirerMenu,
  inquirerInput,
  inquirerComplete,
  inquirerSelectTask,
} = require('./helpers/inquirer');
const Task = require('./models/Task');
const TaskRepository = require('./repositories/TaskRepository');

const taskRepository = new TaskRepository();

const main = async () => {
  let option = '';

  do {
    option = await inquirerMenu();

    switch (option) {
      case 1:
        const title = await inquirerInput('Task Title:');
        taskRepository.createTask(title);
        break;
      case 2:
        const allTasks = taskRepository.getAllTasks();
        allTasks.map((task) => {
          task.done
            ? console.log(
                `> ${task.title} - ${'[COMPLETED]'.green} - ${task.finished}`
              )
            : console.log(`> ${task.title} - ${'[INCOMPLETED]'.red}`);
        });
        break;
      case 3:
        const taskToComplete = await inquirerSelectTask(
          'Complete a Task',
          getTaskList(true)
        );
        taskRepository.completeTask(taskToComplete);
        break;
      case 4:
        const taskToDelete = await inquirerSelectTask(
          'Delete a Task',
          getTaskList(false)
        );
        console.log(taskToDelete);
        taskRepository.deleteTask(taskToDelete);
        break;
    }
  } while (option !== 0);
};

main();

// Si checked es true -> Voy a marcar check las que ya complete
// Si checked es false -> No las marco y uso el check para eliminar
const getTaskList = (checked) => {
  const allTasks = taskRepository.getAllTasks();
  let taskChoices = [];
  for (let i = 0; i < allTasks.length; i++) {
    taskChoices.push({
      value: allTasks[i].id,
      name: allTasks[i].title,
      checked: checked & allTasks[i].done,
    });
  }
  return taskChoices;
};
