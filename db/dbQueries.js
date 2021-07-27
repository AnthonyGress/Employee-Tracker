const connection = require('./connection');

// classes of functions
class DB {
  constructor(connection){
    this.connection = connection
  }

  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee. role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    )
  }

  findAllDepartments(){
    return this.connection.query(
      "SELECT * FROM department;"
    )
  }

  findAllRoles(){
    return this.connection.query(
      "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department on role.department_id = department.id;"
    )
  }

  addNewDepartment(newDept){
    return this.connection.query(
      "INSERT INTO department (name) VALUES (?)", newDept, (err,result) => {
        if (err) throw error
        else {
          console.log(`Added new department ${newDept}`)
          menu();
        }
      }
    )
  }
  addNewRole(roleInfo){
    return this.connection.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", roleInfo, (err,result) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(`Added new department ${roleInfo[0]}`)
          menu();
        }
      }
    )
  }
  updateRole(updateInfo){
    return this.connection.query(
      "UPDATE employee SET role_id = (?) WHERE first_name = ? AND last_name = ?;", updateInfo, (err,result) => {
        if (err) throw err
        else {
          console.log(`Updated ${updateInfo[1]} ${updateInfo[2]}'s role id to ${updateInfo[0]}`)
        menu();
      }
      }
    )
  }

  addNewEmployee(employeeInfo){
    return this.connection.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", employeeInfo, (err,result) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(`Added new employee ${employeeInfo[0]} ${employeeInfo[1]}`);
          menu();
        }
      }
    )
  }
  employeeNames (){
    return this.connection.query(
      "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name FROM employee;"
    )
  }

}

module.exports = new DB(connection);
