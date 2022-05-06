require('colors');

const {
  inquirerMenu,
  inquirerInput,
  inquirerSelectTask,
  inquirerConfirm,
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
        console.clear();
        try {
          console.log('Create a task');
          const title = await inquirerInput('Task Title:');
          taskRepository.createTask(title);
        } catch (e) {
          console.log(e.message.red);
        }
        break;
      case 2:
        console.clear();
        const allTasks = taskRepository.getAllTasks();

        if (allTasks.length == 0) {
          console.log('« Tasks list is empty »'.gray);
        } else {
          console.log('« Tasks list »'.blue);

          allTasks.map((task) => {
            task.done
              ? console.log(
                  `> ${task.title} - ${'[COMPLETED]'.green} - ${task.finished}`
                )
              : console.log(`> ${task.title} - ${'[PENDIENT]'.gray}`);
          });
        }
        break;
      case 3:
        console.clear();
        const taskToComplete = await inquirerSelectTask(
          'Complete a task(s)',
          getTaskList(true)
        );
        taskRepository.completeTask(taskToComplete);
        break;
      case 4:
        console.clear();
        const taskToDelete = await inquirerSelectTask(
          'Delete a task(s)',
          getTaskList(false)
        );

        if (taskToDelete.length > 0) {
          const confirm = await inquirerConfirm(
            'Are you sure you want to delete the task(s)?'
          );
          if (confirm) {
            taskRepository.deleteTask(taskToDelete);
          }
        }

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
