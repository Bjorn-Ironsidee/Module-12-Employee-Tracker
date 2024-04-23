# Module 12 Employee Tracker
 Module 12 Employee Tracker
# Employee Tracker

This is a command-line application that allows a business owner to view and manage departments, roles, and employees in their company.

## Installation

1. Clone the repository: `git clone`
2. Navigate to the project directory: `cd employee-tracker`
3. Install dependencies: `npm install`

## Usage

1. Start the application: `node server.js`
2. Follow the prompts to view, add, or update departments, roles, and employees.

## Dependencies

- Express: ^4.17.1
- MySQL2: ^2.3.0
- Inquirer: ^8.0.0


### Departments

- id: INT PRIMARY KEY
- name: VARCHAR(100) NOT NULL

### Roles

- id: INT PRIMARY KEY
- title: VARCHAR(100) NOT NULL
- salary: DECIMAL(10, 2) NOT NULL
- department_id: INT, FOREIGN KEY(department_id) REFERENCES departments(id)

### Employees

- id: INT PRIMARY KEY
- first_name: VARCHAR(100) NOT NULL
- last_name: VARCHAR(100) NOT NULL
- role_id: INT, FOREIGN KEY(role_id) REFERENCES roles(id)
- manager_id: INT, FOREIGN KEY(manager_id) REFERENCES employees(id)

## License

This project is not under license.
