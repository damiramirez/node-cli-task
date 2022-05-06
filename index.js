require('colors');

const {
  inquirerMenu,
  inquirerInput,
  inquirerComplete,
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
        const taskToComplete = await inquirerComplete(getTaskList());
        taskRepository.completeTask(taskToComplete);
        break;
    }
  } while (option !== 0);
};

main();

const getTaskList = () => {
  const allTasks = taskRepository.getAllTasks();
  let taskChoices = [];
  for (let i = 0; i < allTasks.length; i++) {
    taskChoices.push({
      value: allTasks[i].id,
      name: allTasks[i].title,
      checked: allTasks[i].done,
    });
  }
  // taskChoices.push({value: false, name: 'Go back...'.green})
  return taskChoices;
};
