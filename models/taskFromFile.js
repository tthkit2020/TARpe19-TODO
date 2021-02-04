const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const fs = require('fs');
const path = require('path');

const filePath = path.join(path.dirname(require.main.filename), 'data', 'tasks.json');

module.exports = class Task {
    constructor(task){
        this.description = task;
    }

    saveTask(){
        fs.readFile(filePath, (error, fileContent) => {
            let tasks = [];

            if(!error){
                tasks = JSON.parse(fileContent);
            } else {
                console.log(error);
            }

            tasks.push(this);
            fs.writeFile(filePath, JSON.stringify(tasks), (error) => {
                console.log(error);
            });
        }); 
    }

    static fetchTasks(callBack){
        fs.readFile(filePath, (error, fileContent) => {
            if(error){
                callBack([]);
            }

            callBack(JSON.parse(fileContent));
        });
    }

    static deleteTask(taskDescription){
        fs.readFile(filePath, (error, fileContent) => {
            let tasks = [];
            if(!error){
                tasks = JSON.parse(fileContent);
            }

            for(let i = 0; i < tasks.length; i++) {
                if(tasks[i].description === taskDescription){
                    tasks.splice(i, 1);
                    break;
                }
            }
            
            fs.writeFile(filePath, JSON.stringify(tasks), (error) => {
                console.log('error from writing');
            });

        });
    }
}

//{"description": "Task One"} - json
//{description: "Task One"} - js object