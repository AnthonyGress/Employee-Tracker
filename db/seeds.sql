INSERT INTO department (name)
VALUES ("Engineering"),
       ("Sales"),
       ("Finance"),
       ("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Developer", 80000, 1001),
       ("Salesperson", 60000, 1002),
       ("Accountant", 75000, 1003),
       ("Customer Liason", 50000, 1004),
       ("Engineering Manager", 90000, 1001),
       ("Sales Manager", 90000, 1002),
       ("Finance Manager", 90000, 1003),
       ("Customer Services Manager", 90000, 1004);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Michael", "Scott", 8, NULL),
("Jim", "Bean", 7, NULL),
("Taylor", "Swift", 6, NULL),
("John", "Michaels", 5, NULL),
("Michael", "Douglas", 3, 2),
("Tina", "Turner", 3, 2),
("Jerry", "McGuire", 1, 4),
("Rick", "Sanchez", 1, 4),
("Anthony", "Stone", 4, 1),
("Jill", "Manders", 4, 1),
("Scott", "McPherson", 2, 3),
("Randy", "Randalson", 2, 3);
