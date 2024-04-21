INSERT INTO departments (name)
VALUES ('Sales'), ('Engineering'), ('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Manager', 70000, 1),
       ('Sales Representative', 50000, 1),
       ('Software Engineer', 80000, 2),
       ('Marketing Manager', 60000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
       ('Jane', 'Smith', 2, 1),
       ('Alice', 'Johnson', 3, 2),
       ('Bob', 'Brown', 4, NULL);
