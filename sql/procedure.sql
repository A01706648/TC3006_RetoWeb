USE `NATGAS_HU`;

DROP PROCEDURE IF EXISTS `existProject`;
DROP PROCEDURE IF EXISTS `saveProject`;
DROP PROCEDURE IF EXISTS `saveStory`;
DROP PROCEDURE IF EXISTS `saveTask`;
DROP PROCEDURE IF EXISTS `saveTest`;
DROP PROCEDURE IF EXISTS `saveUser`;
DROP PROCEDURE IF EXISTS `saveProjectAssignment`;
DROP PROCEDURE IF EXISTS `deleteProjectAssignment`;
DROP PROCEDURE IF EXISTS `saveFile`;
DROP PROCEDURE IF EXISTS `deleteFile`;

DELIMITER $$
CREATE PROCEDURE existProject(IN id INT, OUT exist INT)
BEGIN
    SELECT COUNT(*) INTO exist FROM project WHERE id=id;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE saveProject(   IN id INT,
                                IN name VARCHAR(256), 
                                IN create_date DATE, 
                                IN est_date DATE, 
                                IN description VARCHAR(1024), 
                                IN state INT)
BEGIN
    DECLARE exist_project INT DEFAULT 0;
    DECLARE new_id INT DEFAULT 0;
    DECLARE row_num INT DEFAULT 0;
    DECLARE saved_id INT DEFAULT 0;

    SELECT COUNT(*) INTO exist_project FROM project WHERE project.id=id;

    IF exist_project > 0 THEN
        UPDATE project 
        SET name=name, create_date=create_date, est_date=est_date, description=description, state=state 
        WHERE project.id=id;
        SET saved_id=id;
    ELSE
        SELECT COUNT(*) INTO row_num FROM project;
        IF row_num = 0 THEN
            SET new_id = 1;
        ELSE    
            SELECT MAX(project.id) INTO new_id FROM project;
            SET new_id=new_id + 1;
        END IF;
        INSERT INTO project(id, name, create_date, est_date, description, state) 
        VALUES (new_id, name, create_date, est_date, description, state);
        SET saved_id=new_id;
    END IF;
    SELECT saved_id as id;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE saveStory( IN id INT,
                            IN project_id INT,
                            IN user_id VARCHAR(64),
                            IN name VARCHAR(256), 
                            IN create_date DATE, 
                            IN est_date DATE, 
                            IN description VARCHAR(1024), 
                            IN purpose VARCHAR(1024),
                            IN comment VARCHAR(1024),
                            IN stakeholder INT,
                            IN ap INT,
                            IN state INT)
BEGIN
    DECLARE exist_story INT DEFAULT 0;
    DECLARE new_id INT DEFAULT 0;
    DECLARE row_num INT DEFAULT 0;
    DECLARE saved_id INT DEFAULT 0;

    SELECT COUNT(*) INTO exist_story FROM story WHERE story.id=id;

    IF exist_story > 0 THEN
        UPDATE story 
        SET project_id=project_id, user_id=user_id, name=name, create_date=create_date, est_date=est_date, description=description, purpose=purpose, comment=comment, stakeholder=stakeholder, ap=ap, state=state
        WHERE story.id=id;
        SET saved_id=id;
    ELSE
        SELECT COUNT(*) INTO row_num FROM story;
        IF row_num = 0 THEN
            SET new_id = 1;
        ELSE
            SELECT MAX(story.id) INTO new_id FROM story;
            SET new_id=new_id + 1;
        END IF;
        INSERT INTO story(id, project_id, user_id, name, create_date, est_date, description, purpose, comment, stakeholder, ap, state) 
        VALUES (new_id, project_id, user_id, name, create_date, est_date, description, purpose, comment, stakeholder, ap, state);
        SET saved_id=new_id;
    END IF;
    SELECT saved_id as id;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE saveTask( IN id INT,
                            IN story_id INT,
                            IN user_id VARCHAR(64),
                            IN name VARCHAR(256), 
                            IN create_date DATE, 
                            IN est_date DATE, 
                            IN real_date DATE,
                            IN description VARCHAR(1024), 
                            IN purpose VARCHAR(1024),
                            IN comment VARCHAR(1024),
                            IN est_hour INT,
                            IN real_hour INT,
                            IN stakeholder INT,
                            IN value INT,
                            IN type INT,
                            IN state INT)
BEGIN
    DECLARE exist_task INT DEFAULT 0;
    DECLARE new_id INT DEFAULT 0;
    DECLARE row_num INT DEFAULT 0;
    DECLARE saved_id INT DEFAULT 0;

    SELECT COUNT(*) INTO exist_task FROM task WHERE task.id=id;

    IF exist_task > 0 THEN
        UPDATE task 
        SET story_id=story_id, user_id=user_id, name=name, create_date=create_date, est_date=est_date, real_date=real_date, description=description, purpose=purpose, comment=comment, est_hour=est_hour, real_hour=real_hour, stakeholder=stakeholder, value=value, type=type, state=state
        WHERE task.id=id;
        SET saved_id=id;
    ELSE
        SELECT COUNT(*) INTO row_num FROM task;
        IF row_num = 0 THEN
            SET new_id = 1;
        ELSE    
            SELECT MAX(task.id) INTO new_id FROM task;
            SET new_id=new_id + 1;
        END IF;
        INSERT INTO task(id, story_id, user_id, name, create_date, est_date, real_date, description, purpose, comment, est_hour, real_hour, stakeholder, value, type, state) 
        VALUES (new_id, story_id, user_id, name, create_date, est_date, real_date, description, purpose, comment, est_hour, real_hour, stakeholder, value, type, state);
        SET saved_id=new_id;
    END IF;
    SELECT saved_id as id;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE saveTest( IN id INT,
                            IN story_id INT,
                            IN user_id VARCHAR(64),
                            IN name VARCHAR(256), 
                            IN create_date DATE, 
                            IN description VARCHAR(1024), 
                            IN expect VARCHAR(1024),
                            IN comment VARCHAR(1024),
                            IN state INT)
BEGIN
    DECLARE exist_test INT DEFAULT 0;
    DECLARE new_id INT DEFAULT 0;
    DECLARE row_num INT DEFAULT 0;
    DECLARE saved_id INT DEFAULT 0;

    SELECT COUNT(*) INTO exist_test FROM test WHERE test.id=id;

    IF exist_test > 0 THEN
        UPDATE test 
        SET id=id, story_id=story_id, user_id=user_id, name=name, create_date=create_date, description=description, expect=expect, comment=comment, state=state
        WHERE test.id=id;
        SET saved_id=id;
    ELSE
        SELECT COUNT(*) INTO row_num FROM test;
        IF row_num = 0 THEN
            SET new_id = 1;
        ELSE        
            SELECT MAX(test.id) INTO new_id FROM test;
            SET new_id=new_id + 1;
        END IF;
        INSERT INTO test(id, story_id, user_id, name, create_date, description, expect, comment, state) 
        VALUES (new_id, story_id, user_id, name, create_date, description, expect, comment, state);
        SET saved_id=new_id;
    END IF;
    SELECT saved_id as id;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE saveUser( IN id VARCHAR(64),
                            IN name VARCHAR(64),
                            IN password VARCHAR(128),
                            IN cost INT, 
                            IN role_id INT)
BEGIN
    DECLARE exist_user INT DEFAULT 0;
    DECLARE saved_id VARCHAR(64) DEFAULT '';

    SELECT COUNT(*) INTO exist_user FROM user WHERE user.id=id;

    SET saved_id=id;

    IF exist_user > 0 THEN
        UPDATE user 
        SET id=id, name=name, password=password, cost=cost, role_id=role_id
        WHERE user.id=id;
    ELSE
        INSERT INTO user(id,  name, password, cost, role_id) 
        VALUES (id,  name, password, cost, role_id);
    END IF;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE saveProjectAssignment( IN project_id INT,
                                        IN user_id VARCHAR(64),
                                        IN hour INT)
BEGIN
    DECLARE exist_assign INT DEFAULT 0;

    SELECT COUNT(*) INTO exist_assign 
    FROM project_assignment 
    WHERE project_assignment.project_id=project_id AND project_assignment.user_id=user_id;

    IF exist_assign > 0 THEN
        UPDATE project_assignment 
        SET hour=hour
        WHERE project_assignment.project_id=project_id AND project_assignment.user_id=user_id;
    ELSE
        INSERT INTO project_assignment(project_id,  user_id, hour) 
        VALUES (project_id,  user_id, hour) ;
    END IF;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE deleteProjectAssignment( IN project_id INT,
                                        IN user_id VARCHAR(64))
BEGIN
    DECLARE exist_assign INT DEFAULT 0;

    SELECT COUNT(*) INTO exist_assign 
    FROM project_assignment 
    WHERE project_assignment.project_id=project_id AND project_assignment.user_id=user_id;

    IF exist_assign > 0 THEN
        DELETE FROM project_assignment 
        WHERE project_assignment.project_id=project_id AND project_assignment.user_id=user_id;
    END IF;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE saveFile(  IN id INT,
                            IN project_id INT,
                            IN name VARCHAR(256),
                            IN location VARCHAR(1024),
                            IN description VARCHAR(1024))
BEGIN
    DECLARE exist_file INT DEFAULT 0;

    SELECT COUNT(*) INTO exist_file 
    FROM file 
    WHERE file.id=id;

    IF exist_file > 0 THEN
        UPDATE file 
        SET project_id=project_id,  name=name, location=location, description=description
        WHERE file.id=id;
    ELSE
        INSERT INTO file(project_id,  name, location, description) 
        VALUES (project_id,  name, location, description) ;
    END IF;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE deleteFile(  IN id INT)
BEGIN
    DECLARE exist_file INT DEFAULT 0;

    SELECT COUNT(*) INTO exist_file 
    FROM file 
    WHERE file.id=id;

    IF exist_file > 0 THEN
        DELETE FROM file 
        WHERE file.id=id;
    END IF;
END $$
DELIMITER ;

