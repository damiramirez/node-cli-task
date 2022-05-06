const inquirer = require('inquirer');
require('colors');

const inquirerMenu = async () => {
  console.log('');
  console.log('========================================'.blue);
  console.log('Select an option'.white);
  console.log('========================================'.blue);

  const menu = [
    {
      type: 'list',
      name: 'option',
      message: 'What do you want to do?',
      choices: [
        {
          value: 1,
          name: `${'1-'.blue} Create Task`,
        },
        {
          value: 2,
          name: `${'2-'.blue} Get Tasks`,
        },
        {
          value: 3,
          name: `${'3-'.blue} Complete a task`,
        },
        {
          value: 4,
          name: `${'4-'.blue} Delete a task`,
        },
        {
          value: 0,
          name: `${'0-'.blue} Exit`,
        },
      ],
    },
  ];

  const { option } = await inquirer.prompt(menu);

  return option;
};

const inquirerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'description',
      message,
    },
  ];

  const { description } = await inquirer.prompt(question);

  return description;
};

const inquirerSelectTask = async (message, choices) => {
  const taskToComplete = [
    {
      type: 'checkbox',
      name: 'select',
      message,
      choices,
    },
  ];

  const { select } = await inquirer.prompt(taskToComplete);

  return select;
};

const inquirerConfirm = async (message) => {
  const confirmQuestion = [
    {
      type: 'confirm',
      name: 'confirm',
      message,
    },
  ];

  const { confirm } = await inquirer.prompt(confirmQuestion);

  return confirm;
};

module.exports = {
  inquirerMenu,
  inquirerInput,
  inquirerSelectTask,
  inquirerConfirm,
};
