USE `NATGAS_HU`;

DELETE FROM project WHERE name='pt';
CALL saveProject(0, 'pt', '2021-4-27', '2021-6-1', 'ptd', 0, @id);
CALL saveProject(@id, 'pt', '2021-4-27', '2021-6-1', 'ptd', 1, @id);
SELECT * FROM project WHERE id=@id;

DELETE FROM story WHERE name='st';
CALL saveStory(0, 1, null, 'st', '2021-4-27', '2021-6-1', 'dst', 'pst', 'cst', 0, 0, 0, @id);
CALL saveStory(@id, 1, null, 'st', '2021-4-27', '2021-6-1', 'dst', 'pst', 'cst', 0, 0, 1, @id);
SELECT * FROM story WHERE id=@id;

DELETE FROM task WHERE name='tt';
CALL saveTask(0, 1, null, 'tt', '2021-4-27', '2021-6-1', '2021-6-1', 'dtt', 'ptt', 'ctt', 0, 0, 0, 0, 0, 0, @id);
CALL saveTask(@id, 1, null, 'tt', '2021-4-27', '2021-6-1', '2021-6-1', 'dtt', 'ptt', 'ctt', 0, 0, 0, 0, 0, 1, @id);
SELECT * FROM task WHERE id=@id;

DELETE FROM test WHERE name='tt';
CALL saveTest(0,1,null, 'tt', '2021-4-27', 'dtt', 'ett', 'ctt', 0, @id);
CALL saveTest(@id,1,null, 'tt', '2021-4-27', 'dtt', 'ett', 'ctt', 1, @id);
SELECT * FROM test WHERE id=@id;

DELETE FROM project_assignment WHERE project_id=1 AND user_id='admin';
CALL saveProjectAssignment(1, 'admin', 0);
CALL saveProjectAssignment(1, 'admin', 1);

CALL deleteProjectAssignment(1, 'admin');

DELETE FROM file WHERE name='ft';
CALL saveFile(0, 1, 'ft', 'lft', 'dft');
SELECT MAX(id) INTO @id FROM file;
CALL saveFile(@id, 1, 'ft', 'lft1', 'dft1');

SELECT MAX(id) INTO @id FROM file;
CALL deleteFile(@id)

DELETE FROM `user` WHERE `user`.id='ut';
CALL saveUser('ut', 'nut', 'put', 0, 0, @id);
CALL saveUser(@id, 'nut', 'put', 0, 1, @id);

CALL existProject(1, @ProjectExistNum)
SELECT @ProjectExistNum AS 'project_exist'


