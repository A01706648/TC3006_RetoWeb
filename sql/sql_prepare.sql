DROP DATABASE IF EXISTS `NATGAS_HU`;
CREATE DATABASE `NATGAS_HU`; 
USE `NATGAS_HU`;

SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

CREATE TABLE function(
    id INT NOT NULL,
    name VARCHAR(64),
    PRIMARY KEY(id));
CREATE TABLE role (
    id INT NOT NULL,
    name VARCHAR(64),
    PRIMARY KEY(id));
CREATE TABLE function_assignment(
    function_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY(function_id, role_id),
    FOREIGN KEY(function_id) REFERENCES function(id),
    FOREIGN KEY(role_id) REFERENCES role(id));
CREATE TABLE cost(
    id INT NOT NULL,
    name VARCHAR(64),
    cost INT,    
    PRIMARY KEY(id));
CREATE TABLE user(
    id VARCHAR(64) NOT NULL,
    name VARCHAR(64),
    password VARCHAR(128),
    cost INT,
    role_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(cost) REFERENCES cost(id),
    FOREIGN KEY(role_id) REFERENCES role(id));
CREATE TABLE work_state(
    id INT NOT NULL,
    name VARCHAR(64),    
    PRIMARY KEY(id));
CREATE TABLE test_state(
    id INT NOT NULL,
    name VARCHAR(64),
    PRIMARY KEY(id));
CREATE TABLE stakeholder(
    id INT NOT NULL,
    name VARCHAR(64),
    PRIMARY KEY(id));
CREATE TABLE phase(
    id INT NOT NULL,
    name VARCHAR(64),
    PRIMARY KEY(id));
CREATE TABLE task_type(
    id INT NOT NULL,
    phase_id INT,
    name VARCHAR(64),
    PRIMARY KEY(id),
    FOREIGN KEY(phase_id) REFERENCES phase(id));
CREATE TABLE project(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(256),
    create_date DATE,
    est_date DATE,
    description VARCHAR(1024),
    state INT,
    PRIMARY KEY(id),
    FOREIGN KEY(state) REFERENCES work_state(id));
CREATE TABLE story(
    id INT AUTO_INCREMENT NOT NULL,
    project_id INT,
    user_id VARCHAR(64),
    create_date DATE,
    est_date DATE,
    stakeholder INT,
    name VARCHAR(256),
    description VARCHAR(1024),
    purpose VARCHAR(1024),
    comment VARCHAR(1024),
    ap INT,
    state INT,
    PRIMARY KEY(id),
    FOREIGN KEY(project_id) REFERENCES project(id),
    FOREIGN KEY(stakeholder) REFERENCES stakeholder(id),
    FOREIGN KEY(user_id) REFERENCES user(id),
    FOREIGN KEY(state) REFERENCES work_state(id));
CREATE TABLE task(
    id INT AUTO_INCREMENT NOT NULL,
    story_id INT,
    user_id VARCHAR(64),
    create_date DATE,
    stakeholder INT,
    name VARCHAR(256),
    est_hour INT,
    real_hour INT,
    est_date DATE,
    real_date DATE,
    description VARCHAR(1024),
    purpose VARCHAR(1024),
    comment VARCHAR(1024),
    state INT,
    type INT,
    value INT,
    PRIMARY KEY(id),
    FOREIGN KEY(story_id) REFERENCES story(id),
    FOREIGN KEY(stakeholder) REFERENCES stakeholder(id),
    FOREIGN KEY(type) REFERENCES task_type(id),
    FOREIGN KEY(user_id) REFERENCES user(id),
    FOREIGN KEY(state) REFERENCES work_state(id));
CREATE TABLE test(
    id INT AUTO_INCREMENT NOT NULL,
    story_id INT,
    user_id VARCHAR(64),
    create_date DATE,
    name VARCHAR(256),
    description  VARCHAR(1024),
    expect  VARCHAR(1024),
    comment  VARCHAR(1024),
    state INT,    
    PRIMARY KEY(id),
    FOREIGN KEY(story_id) REFERENCES story(id),
    FOREIGN KEY(user_id) REFERENCES user(id),
    FOREIGN KEY(state) REFERENCES test_state(id));
CREATE TABLE project_assignment(
    project_id INT NOT NULL,
    user_id VARCHAR(64) NOT NULL,
    hour INT,
    PRIMARY KEY(project_id,user_id),
    FOREIGN KEY(project_id) REFERENCES project(id),
    FOREIGN KEY(user_id) REFERENCES user(id)); 
    

INSERT INTO phase (id, name)    
VALUES
('0', 'Analyze'),
('1', 'Design'),
('2','Implementation'),
('3','Test');


INSERT INTO task_type (id, phase_id, name)
VALUES
('0', '0', 'Test Case'),
('1', '0', 'Analyze Verfication'),
('2', '1', 'Wireframes'),
('3', '1', 'Algorithm'),
('4', '1', 'Component Diagram'),
('5', '1', 'Make Design Document'),
('6', '1', 'Design Validation'),
('7', '2', 'Database Model'),
('8', '2', 'Backend'),
('9', '2', 'Frontend'),
('10', '2', 'Tracability Matrix'),
('11', '2', 'Implementation Verification'),
('12', '2', 'Implementation Validation'),
('13', '2', 'User Manuel'),
('14', '2', 'Achitecture Manual'),
('15', '3', 'Integration Test'),
('16', '3', 'Usability Test'),
('17', '3', 'Security Test'),
('18', '3', 'Make Test Document');
    

INSERT INTO stakeholder (id, name)
VALUES
('0', 'any'),
('1', 'administrator'),
('2', 'sale'),
('3', 'comercial'),
('4', 'analysis'),
('5', 'prospect');
    

INSERT INTO work_state (id, name)
VALUES 
('0', 'init'),
('1', 'in progress'),
('2', 'done'),
('-1', 'invalid');
    

INSERT INTO test_state (id, name)
VALUES
('0', 'init'),
('1', 'in progress'),
('2', 'fail'),
('3', 'pass'),
('-1', 'invalid');
    
  
INSERT INTO role (id, name)
VALUES 
('0', 'user'),
('1', 'admin');


INSERT INTO function (id, name)
VALUES 
('0', 'null'),
('1', 'write');


INSERT INTO function_assignment (function_id, role_id)
VALUES 
(1, 0),
(1, 1);


INSERT INTO cost (id, name, cost)
VALUES 
('0', 'null', '0'),
('1', 'junior', '5000'),
('2', 'mid', '7500'),
('3', 'senior', '10000');

