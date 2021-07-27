INSERT INTO department (name)
VALUES ("Engineering"),
       ("Sales"),
       ("Finance"),
       ("Customer Service");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Software Developer", 80000, 1001),
       (2, "Salesperson", 60000, 1002),
       (3, "Accountant", 75000, 1003),
       (4, "Customer Liason", 50000, 1004),
       (5, "Engineering Manager", 90000, 1001),
       (6, "Sales Manager", 90000, 1002),
       (7, "Finance Manager", 90000, 1003),
       (8, "Customer Services Manager", 90000, 1004);


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
