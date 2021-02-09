const date = require('../getDate.js');

const mongoose = require('mongoose');
const Task = mongoose.model('Task');
//const Task = require('../models/taskFromFile');


exports.getMainPage = (req, res)=> {
    let today = date.getDate();

    Task.find((error, tasks) => {
        if(!error){
            res.render('index.ejs', {date: today, toDoItems: tasks});
        } else {
            console.log('Failed to retrieve data.');
        }
    });
};

exports.postnewTask = (req, res) => {
    let item = req.body.newTask;//!!
    let newTask = new Task();
    newTask.description = item;

    newTask.save((error, response) => {
        if(!error){
            res.redirect('/');
        } else {
            console.log("Failed to save data.");
        }
    });
}

exports.deleteTask = (req, res) => {
    const checkedItemId = req.body.checkbox;

    Task.findByIdAndRemove(checkedItemId, (error)=>{
        if(!error){
            res.redirect('/');
        } else {
            console.log("Failed to remove an item.");
        }
    });
}