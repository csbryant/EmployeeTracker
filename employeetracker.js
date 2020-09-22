const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Insert password here
    password: '',
    database: 'employees_DB'
  });
  
connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    mainMenu();
});


function mainMenu() {
    inquirer.prompt({
        name: 'menu',
        type: 'list',
        message: 'Welcome to EMPLOYEE TRACKER!',
        choices: [
            'View All Employees',
            'View All Employees by Department',
            'View All Departments',
            'View All Roles',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Update Employee Role',
            'Exit'
        ]
    }).then(function(answer) {
        if (answer.menu === 'View All Employees'){
            viewAll();
        } if (answer.menu === 'View All Employees by Department'){
            viewAllByDept();
        } if (answer.menu === 'View All Departments'){
            viewDept();
        } if (answer.menu === 'View All Roles'){
            viewRole();
        } else if (answer.menu === 'Exit' ){
            connection.end();
        };
    });
};

function viewAll() {
let query = 'SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, " " ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;';
connection.query(query, function(err, res) {
    if (err) return(err);
    console.table(res);
    mainMenu();
    });
};

function viewAllByDept() {
    let query = 'SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);';
    connection.query(query, function(err, res) {
        if (err) return(err);
        console.table(res);
        mainMenu();
    });
};

function viewDept() {
    let query = 'SELECT * from department;';
    connection.query(query, function(err, res) {
        if (err) return(err);
        console.table(res);
        mainMenu();
    });
};

function viewRole() {
    let query = 'SELECT * from role;';
    connection.query(query, function(err, res) {
        if (err) return(err);
        console.table(res);
        mainMenu();
    });
};