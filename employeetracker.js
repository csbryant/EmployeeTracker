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
        } if (answer.menu === 'Add Employee'){
            addEmployee();
        } if (answer.menu === 'Add Role'){
            addRole();
        } if (answer.menu === 'Add Department'){
            addDept();
        } if (answer.menu === 'Update Employee Role'){
            updateEmployee();
        } else if (answer.menu === 'Exit' ){
            connection.end();
        };
    });
};

// for 'View All Employees'
function viewAll() {
let query = 'SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, " " ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;';
connection.query(query, function(err, res) {
    if (err) return(err);
    console.table(res);
    mainMenu();
    });
};

// for 'View All Employees by Department'
function viewAllByDept() {
    let query = 'SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);';
    connection.query(query, function(err, res) {
        if (err) return(err);
        console.table(res);
        mainMenu();
    });
};

// for 'View All Departments'
function viewDept() {
    let query = 'SELECT * from department;';
    connection.query(query, function(err, res) {
        if (err) return(err);
        console.table(res);
        mainMenu();
    });
};

// for 'View All Roles'
function viewRole() {
    let query = 'SELECT * from role;';
    connection.query(query, function(err, res) {
        if (err) return(err);
        console.table(res);
        mainMenu();
    });
};


// for 'Add Employee'
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter employee first name',
            name: 'firstname',
        },
        {
            type: 'input',
            message: 'Enter employee last name',
            name: 'lastname',
        },
        {
            type: 'input',
            message: 'Enter employee role id number',
            name: 'role'
        },
        {
            type: 'input',
            message: 'Enter manager id number',
            name: 'manager'
        }
    ]).then(function (answer){
        let query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)'
        let answerArray =  [answer.firstname, answer.lastname, answer.role, answer.manager];
        connection.query(query, answerArray, function(err){
                if (err) throw err;
                console.log('Employee Added!')
                mainMenu();
            });
    });
};


// for 'Add Role'
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter role name',
            name: 'rolename',
        },
        {
            type: 'input',
            message: 'Enter role salary',
            name: 'rolesalary',
        },
        {
            type: 'input',
            message: 'Enter department ID',
            name: 'deptid'
        }
    ]).then(function (answer){
        let query = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)'
        let answerArray =  [answer.rolename, answer.rolesalary, answer.deptid];
        connection.query(query, answerArray, function(err){
                if (err) throw err;
                console.log('Role Added!')
                mainMenu();
            });
    });
};


// for 'Add Role'
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter role name',
            name: 'rolename',
        },
        {
            type: 'input',
            message: 'Enter role salary',
            name: 'rolesalary',
        },
        {
            type: 'input',
            message: 'Enter department ID',
            name: 'deptid'
        }
    ]).then(function (answer){
        let query = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)'
        let answerArray =  [answer.rolename, answer.rolesalary, answer.deptid];
        connection.query(query, answerArray, function(err){
                if (err) throw err;
                console.log('Role Added!')
                mainMenu();
            });
    });
};

// for 'Add Dept'
function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter department name',
            name: 'deptname',
        }
    ]).then(function (answer){
        let query = 'INSERT INTO department (name) VALUES (?)'
        let answerArray =  [answer.deptname];
        connection.query(query, answerArray, function(err){
                if (err) throw err;
                console.log('Role Added!')
                mainMenu();
            });
    });
};




// for 'Update Employee Role'
function updateEmployee() {
    inquirer
      .prompt({
        name: "id",
        type: "input",
        message: "Enter employee id",
      })
      .then(function (answer) {
        var id = answer.id;
  
        inquirer
          .prompt({
            name: "roleId",
            type: "input",
            message: "Enter new employee role ID",
          })
          .then(function (answer) {
            var roleId = answer.roleId;
  
            var query = "UPDATE employee SET role_id=? WHERE id=?";
            connection.query(query, [roleId, id], function (err, res) {
              if (err) {
                console.log(err);
              }
              mainMenu();
            });
          });
      });
  };