const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Insert password here
    password: "",
    database: "employees_DB"
  });
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    mainMenu();
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
            "Add Employee",
            "Add Employee Role",
            "Add Employee Manager",
            "View All Roles",
            "Exit"
        ]
    }).then(function(answer) {
        if (answer.menu === "Exit"){
            connection.end();
        } else if (answer.menu === "View all employees"){
            viewAll();
        }
    })
}

function viewAll() {
let query = "SELECT * FROM EMPLOYEE"
connection.query(query, function(err, res) {
    if (err) return(err);
    console.table(res);
    mainMenu();
})
}