
INSERT INTO `Taskrs` (`id`, `username`, `password`, `secQuestion1`, `secQuestionAnswer1`, `secQuestion2`, `secQuestionAnswer2`, `secQuestion3`, `secQuestionAnswer3`, `loggedIn`, `createdAt`, `updatedAt`)
VALUES
	(1,'duane','1234','Name of your childhood best friend?','ted','Name of your high school mascot?','ducks','Name of the street you grew up on?','main',1,'2018-03-15 06:55:06','2018-03-15 06:55:06'),
	(2,'keka','Keka','Name of your childhood best friend?','marie','Name of your first pet?','gucci','Apple or Samsung?','apple',1,'2018-03-15 06:55:51','2018-03-15 06:55:51'),
	(3,'gabe','Drak3','What is you mothers maiden name?','irma','Name of your first pet?','diamond','What is your favorite color?','brown',1,'2018-03-15 06:57:02','2018-03-15 07:01:24'),
	(4,'antoine','code123','Make of your first car?','jag','Name of your high school mascot?','hawks','Apple or Samsung?','samsung',1,'2018-03-15 06:59:14','2018-03-15 07:08:40');



INSERT INTO `Tasks` (`id`, `title`, `price`, `category`, `body`, `dayofWeek`, `taskrAccept`, `requesterAccept`, `taskrMarkComplete`, `requesterMarkComplete`, `createdAt`, `updatedAt`, `TaskrId`)
VALUES
	(1,'Cooking',5.00,'Culinary','Learn to cook','Monday',0,0,0,0,'2018-03-15 01:17:26','2018-03-15 01:17:26',2),
	(2,'Sing',20.00,'Event Planning','Learn to sing','Wednesday',0,0,0,0,'2018-03-15 01:21:23','2018-03-15 01:21:23',4);
