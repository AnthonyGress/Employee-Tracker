const connection = require("./connection");

// classes of functions
class DB {
  constructor(connection) {
    this.connection = connection;
  }
  // returns all of the employee related data from the db
  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee. role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }
  // returns the department table from the db
  findAllDepartments() {
    return this.connection.query("SELECT * FROM department;");
  }
  // returns all the related data about the roles
  findAllRoles() {
    return this.connection.query(
      "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }
  // creates a new dept using the value from inquirer
  addNewDepartment(newDept) {
    return this.connection.query(
      "INSERT INTO department (name) VALUES (?)",
      newDept,
      (err, result) => {
        if (err) throw error;
        else {
          console.log(`Added new department ${newDept}`);
          menu();
        }
      }
    );
  }
  // creates a new role using the value from inquirer
  addNewRole(roleInfo) {
    return this.connection.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      roleInfo,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Added new role ${roleInfo[0]}`);
          menu();
        }
      }
    );
  }
  // updates the selected employees role
  updateRole(updateInfo) {
    return this.connection.query(
      "UPDATE employee SET role_id = (?) WHERE first_name = ? AND last_name = ?;",
      updateInfo,
      (err, result) => {
        if (err) throw err;
        else {
          console.log(
            `Updated ${updateInfo[1]} ${updateInfo[2]}'s role id to ${updateInfo[0]}`
          );
          menu();
        }
      }
    );
  }
  // creates a new employee using the value from inquirer
  addNewEmployee(employeeInfo) {
    return this.connection.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      employeeInfo,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(
            `Added new employee ${employeeInfo[0]} ${employeeInfo[1]}`
          );
          menu();
        }
      }
    );
  }
  // helper function which returns a list of the employee's first and last names
  employeeNames() {
    return this.connection.query(
      "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name FROM employee;"
    );
  }
}

module.exports = new DB(connection);
