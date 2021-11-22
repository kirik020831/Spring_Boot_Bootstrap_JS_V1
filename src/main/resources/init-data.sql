INSERT INTO users (age,email,lastname,password,username)
VALUES
    (22,'max','Antonov','$2a$12$rrPP52T4oI69L7Ih7pBI2Oh8fLtsOmE3KQzIqAURib5zOs1xRqowK','max'),
    (32,'vlad','Markov','$2a$12$4ubvjxnZANYa90hdgwrVOOC1Bl.fH56qE8cbRguFuVmrNQoJ2nGma','vlad');



INSERT INTO roles (role)
VALUES
('ADMIN'),
('USER');


INSERT INTO users_roles (users_id,roles_id)
VALUES
(1,1),
(2,2);