const { inquirerMenu, inquirerInput } = require('./helpers/inquirer');
const TaskRepository = require('./repositories/TaskRepository');

const main = async () => {
  const taskRepository = new TaskRepository();

  let option = '';

  do {
    option = await inquirerMenu();

    switch (option) {
      case 1:
        // TODO: Hacer que el usuario pueda ingresar el titulo de tarea
        const title = await inquirerInput('Task Title:');
        taskRepository.createTask(title);
        break;
      case 2:
        // TODO: Mostrar tareas de DB
        const allTasks = taskRepository.getAllTasks();
        console.log(allTasks);
        break;
    }
  } while (option !== 0);
};

main();
