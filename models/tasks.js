require('colors');
const Task = require("./task");

class Tasks {

    _list = {}

    get listArr() {
        
        const list = [];
        Object.keys(this._list).forEach( key => {
            const task = this._list[key];
            list.push(task);
        })

        return list;
    }

    constructor(){
        this._list = {};
    }

    deleteTask( id ){

        if( this._list[id]){
            delete this._list[id];
        }
    }

    tasksFromArr( task ){
        task.forEach( element => {
            this._list[element.id] = element;
        })
    }

    newTask( desc = '') {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    listCompleted(){
        console.log('\n');
        this.listArr.forEach((element,index) => {
            const idx = `${index+1}`.green;
            const { desc, completed} = element;
            const status = (completed) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx}: ${desc} :: ${status}`);
        });
    }
    completedPendingList( comp ){
        console.log('\n');
        let cont = 0;
        this.listArr.forEach( element => {
            const { desc, completed} = element;
            const status = (completed) ? 'Completada'.green : 'Pendiente'.red;
            if ( comp ) {
                (completed) 
                    ? console.log(`${((cont += 1) + '.').green}  ${desc} ${(':: ' + completed).yellow}`) 
                    : null;
            } else {
                (!completed) 
                    ? console.log(`${((cont += 1) + '.').green}  ${desc} :: ${status}`) 
                    : null;
            }
        });   
    }
    toggleCompleted( ids = [] ){
        ids.forEach( id => {
            const task = this._list[id];
            if(!task.completed){
                let today = new Date();
                task.completed = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`;
            }
        });

        this.listArr.forEach( task => {
            if( !ids.includes(task.id) ){
                this._list[task.id].completed = null;
            }
        });
    }
}

module.exports = Tasks;