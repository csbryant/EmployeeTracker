USE employees_DB;

INSERT INTO department (name)
VALUES ("Research"), ("Finance"), ("Human Resources"), ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Project Manager", 115000, 1),
("Engineer", 110000, 1),
("Finance Manager", 115000, 2),
("Finance Analyst", 115000, 2),
("HR Generalist", 55000, 3),
("Creative Director", 72000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Greg", "Daniels", 1, null),
("Sarah", "Chewning", 2, 1),
("Bob", "Davidson", 3, null),
("Samuel", "Mueting", 4, 3),
("Carolina", "Ossandon", 5, null),
("Kamala", "Gwent", 6, null);