const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "boston"
  });
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});


function mainMenu() {
    inquirer.prompt({
        name: "menu",
        type: "list",
        message: "Welcome to EMPLOYEE TRACKER!",
        choices: [
            "View all employees",
            "View all employees by Department",
            "View all employees by Manager",
            "Add Employye",
            "Add Employye Role",
            "Add Employye Manager",
            "View All Roles",
            "Exit"
        ]
    }).then(function(answer) {
        if (answer.menu === "Exit"){
            connection.end();
        }
    })
}