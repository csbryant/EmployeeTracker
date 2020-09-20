USE employees_DB;

INSERT INTO department (name)
VALUES ("Research"), ("Finance"), ("Human Resources"), ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Project Manager", 115000, 1), ("Creative Director", 72000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Greg", "Daniels", 11, null), ("Samuel", "Chewning", 32, 1);