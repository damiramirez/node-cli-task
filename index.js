const { inquirerMenu, inquirerInput } = require('./helpers/inquirer');
const TaskRepository = require('./repositories/TaskRepository');

const main = async () => {
  const taskRepository = new TaskRepository();

  const option = await inquirerMenu();

  switch (option) {
    case 1:
      // TODO: Hacer que el usuario pueda ingresar el titulo de tarea
      const title = await inquirerInput('Title for the task');
      taskRepository.createTask(title);
      break;
    case 2:
      // TODO: Mostrar tareas de DB
      console.log('Mostrar tareas');
      break;
  }
};

main();
