require("colors");
const {
  inquirerMenu,
  pause,
  readInput,
  listTasksDelete,
  confirm,
  checkList
} = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/saveArchive");
const Tasks = require("./models/tasks");

console.clear();

const main = async () => {
  let opt = "";

  const tasks = new Tasks();
  const taskDB = readDB();

  if (taskDB) {
    //Cargar tareas desade la db
    tasks.tasksFromArr(taskDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await readInput("Descripción: ");
        tasks.newTask(desc);
        break;
      case "2":
        tasks.listCompleted();
        break;
      case "3":
        tasks.completedPendingList(true);
        break;
      case "4":
        tasks.completedPendingList(false);
        break;
      case "5":
        const ids = await checkList(tasks.listArr);
        tasks.toggleCompleted(ids);
        break;
      case "6":
        const id = await listTasksDelete(tasks.listArr);
        if (id !== "0") {
          const deleteConfirm = await confirm("¿ Estas seguro ?");
          if (deleteConfirm) {
            tasks.deleteTask(id);
            console.log("\n  Tarea borrada".green);
          }
        }
        break;
      default:
        break;
    }

    saveDB(tasks.listArr);

    await pause();
  } while (opt !== "0");
};

main();
