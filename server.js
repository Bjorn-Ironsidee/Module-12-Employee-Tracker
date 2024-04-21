const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', // MySQL password here
  database: 'company_db' // database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');
  start();
});

function start() {
  inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'
    ]
  }).then((answer) => {
    switch (answer.action) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        db.end();
        break;
    }
  });
}

function viewDepartments() {
  const sql = 'SELECT * FROM departments';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(results);
    start(); // Restart the prompt
  });
}


function viewRoles() {
  const sql = 'SELECT roles.*, departments.name AS department FROM roles JOIN departments ON roles.department_id = departments.id';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(results);
    start(); // Restart the prompt
  });
}


function viewEmployees() {
  const sql = 'SELECT employees.*, roles.title AS role, departments.name AS department FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(results);
    start(); // Restart the prompt
  });
}


function addDepartment() {
  inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter the name of the new department:'
  }).then((answer) => {
    const sql = 'INSERT INTO departments (name) VALUES (?)';
    const params = [answer.name];
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Department added successfully!');
      start(); // Restart the prompt
    });
  });
}


function addRole() {
  inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'Enter the title of the new role:'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter the salary for this role:'
    },
    {
      name: 'department_id',
      type: 'input',
      message: 'Enter the department ID for this role:'
    }
  ]).then((answers) => {
    const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
    const params = [answers.title, answers.salary, answers.department_id];
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Role added successfully!');
      start(); // Restart the prompt
    });
  });
}


function addEmployee() {
  inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: "Enter the employee's first name:"
    },
    {
      name: 'last_name',
      type: 'input',
      message: "Enter the employee's last name:"
    },
    {
      name: 'role_id',
      type: 'input',
      message: "Enter the employee's role ID:"
    },
    {
      name: 'manager_id',
      type: 'input',
      message: "Enter the employee's manager's ID:"
    }
  ]).then((answers) => {
    const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    const params = [answers.first_name, answers.last_name, answers.role_id, answers.manager_id];
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Employee added successfully!');
      start(); // Restart the prompt
    });
  });
}


function updateEmployeeRole() {
  inquirer.prompt([
    {
      name: 'employee_id',
      type: 'input',
      message: 'Enter the ID of the employee you want to update:'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter the new role ID for this employee:'
    }
  ]).then((answers) => {
    const sql = 'UPDATE employees SET role_id = ? WHERE id = ?';
    const params = [answers.role_id, answers.employee_id];
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Employee role updated successfully!');
      start(); // Restart the prompt
    });
  });
}


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
