let inquirer = require("inquirer");
require("colors");

const question = [
  {
    type: "list",
    name: "option",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const messagePause = [
  {
    type: "input",
    name: "option",
    message: `Presione ${"ENTER".green} para continuar ...`,
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("============================".green);
  console.log("   seleccione una opción   ".yellow);
  console.log("============================\n".green);

  const { option } = await inquirer.prompt(question);
  return option;
};

const pause = async () => {
  console.log("\n");
  await inquirer.prompt(messagePause);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Ingresa descripción de tarea";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listTasksDelete = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const index = `${i + 1}.`.green;
    return {
      value: task.id,
      name: `${index} ${task.desc}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar'.yellow
  });

  const question = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices
    },
  ];

  const { id } = await inquirer.prompt(question);
  return id;

};

const confirm = async(message) =>{
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
}

const checkList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const index = `${i + 1}.`.green;
    return {
      value: task.id,
      name: `${index} ${task.desc}`,
      checked: (task.completed) ? true : false
    };
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices
    },
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;

};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listTasksDelete,
  confirm,
  checkList
};
