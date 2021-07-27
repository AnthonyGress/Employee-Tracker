const inquirer = require('inquirer');
const db = require('./db/dbQueries');

const init = () => {
  console.log("Welcome to the Employee Tracker!");
  menu();
}
// TODO comment this bad boy
menu = () => {
  console.log('\n');
  inquirer
  .prompt(menuQs)
  .then((answers) => {
  if (answers.menu == 'View All Departments') {
    viewDepartments();
  }
  else if (answers.menu == 'View All Roles') {
    viewRoles();
    menu();
  }
  else if (answers.menu == 'View All Employees') {
    viewEmployees();
  }
  else if (answers.menu == 'Add a Department') {
    inquirer
    .prompt(
      {
        type: "input",
        message: 'What is the name of the department you would like to add?',
        name: "dept",
        default: "1001"
      }
      )
    .then((answer) => {
      addDepartment(answer.dept);
    })
  }
  else if (answers.menu == 'Add a Role') {
    inquirer
    .prompt(
      [{
        type: "input",
        message: 'What is the name of the role you would like to add?',
        name: "role"
      },
      {
        type: "input",
        message: 'What is the salary for this role?',
        name: "salary"
      },
      {
        type: "input",
        message: 'What is the department id of the role you would like to add?',
        name: "dept",
        default: "1001"
      }]
      )
    .then((answer) => {
      let roleInfo = [answer.role, answer.salary, answer.dept]
      addRole(roleInfo);
    })
  }
  else if (answers.menu == 'Add an Employee') {
    inquirer
    .prompt(
      [{
        type: "input",
        message: 'What is the first name of the employee you would like to add?',
        name: "firstName"
      },
      {
        type: "input",
        message: 'What is the last name of the employee you would like to add?',
        name: "lastName"
      },
      {
        type: "input",
        message: "What is the employee's role id?",
        name: "role"
      },
      {
        type: "input",
        message: "What is the employee's manager's id?",
        name: "manager"
      }]
      )
    .then((answer) => {
      let employeeInfo = [answer.firstName, answer.lastName, answer.role, answer.manager];
      addEmployee(employeeInfo);
    })
  }
  else if (answers.menu == 'Update Employee Role') {
    updateEmployee();
  }
  else {
    process.exit();
  }
  })
  .catch((error) => {
  console.log(error);
  });
  }

const menuQs = [
  {
    type: 'list',
    name: 'menu',
    message: 'What would you like to do next?',
    choices:[
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update Employee Role',
      'Exit'
    ],
  }
];


// starts the program
init();

async function viewEmployees (){
  let employees = await db.findAllEmployees();
  console.log('\n');
  console.table(employees);
  menu();
}

async function viewDepartments (){
  let departments = await db.findAllDepartments();
  console.log('\n');
  console.table(departments);
  menu();
}

async function viewRoles (){
  let roles = await db.findAllRoles();
  console.log('\n');
  console.table(roles);
  menu();
}

async function addDepartment (newDept){
  await db.addNewDepartment(newDept);
}

async function addRole (newRole, salary, deptId){
  await db.addNewRole(newRole, salary, deptId); 
}

async function addEmployee (employeeInfo){
  await db.addNewEmployee(employeeInfo); 
}

async function updateEmployee (){
  let employeeArr = [];
  let employees = await db.employeeNames();
    Object.keys(employees).forEach(function(key) {
       let row = employees[key];
      employeeArr.push(row.employee_name);
     });
     
     inquirer
    .prompt(
      [{
        type: "list",
        message: 'Which employee would you like to update?',
        name: "employee",
        choices: employeeArr
      },
      {
        type: "input",
        message: "What is their new role id?",
        name: "role"

      }]
    )
    .then((answer) => {
      let empName = answer.employee.split(" ");
      let first_name = empName[0];
      let last_name = empName[1];
      let updateInfo = [answer.role, first_name, last_name];
      writeUpdate(updateInfo);
    })
}

async function writeUpdate (updateInfo){
  await db.updateRole(updateInfo); 
}