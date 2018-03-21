# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.21)
# Database: groupproject2
# Generation Time: 2018-03-21 06:57:34 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Taskrs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Taskrs`;

CREATE TABLE `Taskrs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `secQuestion1` text NOT NULL,
  `secQuestionAnswer1` text NOT NULL,
  `secQuestion2` text NOT NULL,
  `secQuestionAnswer2` text NOT NULL,
  `secQuestion3` text NOT NULL,
  `secQuestionAnswer3` text NOT NULL,
  `taskrPhoto` varchar(255) DEFAULT NULL,
  `loggedIn` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Taskrs` WRITE;
/*!40000 ALTER TABLE `Taskrs` DISABLE KEYS */;

INSERT INTO `Taskrs` (`id`, `username`, `password`, `secQuestion1`, `secQuestionAnswer1`, `secQuestion2`, `secQuestionAnswer2`, `secQuestion3`, `secQuestionAnswer3`, `taskrPhoto`, `loggedIn`, `createdAt`, `updatedAt`)
VALUES
	(1,'duane','1234','Name of your childhood best friend?','ted','Name of your high school mascot?','ducks','Name of the street you grew up on?','main','',1,'2018-03-15 06:55:06','2018-03-20 23:39:32'),
	(2,'keka','Keka','Name of your childhood best friend?','marie','Name of your first pet?','gucci','Apple or Samsung?','apple','https://instagram.fphl2-3.fna.fbcdn.net/vp/bbb6d5500bcd70544ea353e4b918edf4/5B416D99/t51.2885-15/s640x640/sh0.08/e35/29087490_2060124780936399_960075368482471936_n.jpg',0,'2018-03-15 06:55:51','2018-03-19 23:08:53'),
	(3,'gabe','Drak3','What is you mothers maiden name?','irma','Name of your first pet?','diamond','What is your favorite color?','brown','https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/15966191_10154941827777417_8644129655931809518_n.jpg?oh=12ab314097c9ed14b8d7862e0da537e7&oe=5B428CAA',1,'2018-03-15 06:57:02','2018-03-21 06:57:02'),
	(4,'antoine','code123','Make of your first car?','jag','Name of your high school mascot?','hawks','Apple or Samsung?','samsung','https://instagram.fphl2-3.fna.fbcdn.net/vp/db64e48d8c3017d1f401925099a14c95/5B377037/t51.2885-15/s640x640/sh0.08/e35/23823242_1755074758128070_4309052520988147712_n.jpg',0,'2018-03-15 06:59:14','2018-03-20 00:37:21'),
	(9,'mike','1234','What is you mothers maiden name?','1234','Name of your first pet?','1234','What is your favorite color?','1234','',0,'2018-03-21 04:41:08','2018-03-21 06:56:45');

/*!40000 ALTER TABLE `Taskrs` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Tasks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Tasks`;

CREATE TABLE `Tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `bodyShorten` text,
  `bodyShortenTrue` tinyint(1) DEFAULT '0',
  `dayofWeek` varchar(255) NOT NULL,
  `taskPhoto` varchar(255) DEFAULT NULL,
  `taskrName` varchar(255) DEFAULT NULL,
  `taskrAccept` tinyint(1) DEFAULT '0',
  `requesterAccept` tinyint(1) DEFAULT '0',
  `taskrMarkComplete` tinyint(1) DEFAULT '0',
  `requesterMarkComplete` tinyint(1) DEFAULT '0',
  `taskeeId` int(11) DEFAULT NULL,
  `taskeeName` varchar(255) DEFAULT NULL,
  `taskPaid` tinyint(1) DEFAULT NULL,
  `taskComment` text,
  `taskCommentTrue` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `TaskrId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TaskrId` (`TaskrId`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`TaskrId`) REFERENCES `Taskrs` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Tasks` WRITE;
/*!40000 ALTER TABLE `Tasks` DISABLE KEYS */;

INSERT INTO `Tasks` (`id`, `title`, `price`, `category`, `body`, `bodyShorten`, `bodyShortenTrue`, `dayofWeek`, `taskPhoto`, `taskrName`, `taskrAccept`, `requesterAccept`, `taskrMarkComplete`, `requesterMarkComplete`, `taskeeId`, `taskeeName`, `taskPaid`, `taskComment`, `taskCommentTrue`, `createdAt`, `updatedAt`, `TaskrId`)
VALUES
	(1,'Learn to ride a Bike',1000.00,'Instruction','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper po',NULL,0,'Sunday','https://s7d2.scene7.com/is/image/dkscdn/17GTXWLGNPRXXXXXXPRF_Green_is/','duane',0,0,0,0,0,'gabe',NULL,NULL,0,'2018-03-19 00:40:06','2018-03-20 17:24:30',1),
	(2,'Learn to Surf',50.00,'Instruction','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla ',NULL,0,'Tuesday','https://s.hdnux.com/photos/56/71/52/12294786/13/920x1240.jpg','duane',0,0,0,0,NULL,NULL,NULL,NULL,0,'2018-03-19 00:40:32','2018-03-19 00:40:32',1),
	(3,'Mow your yard',25.00,'Home Maintenance',' I cut grass.',NULL,0,'Thursday','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_sL6T7JciXM1gq89EvPqFJXN4cl0wKzSm7HwNP6tmELBhgr_H','duane',0,0,0,0,NULL,NULL,NULL,NULL,0,'2018-03-19 00:41:06','2018-03-19 00:41:06',1),
	(4,'BarTender for Hire',35.00,'Culinary','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla ',NULL,0,'Saturday','http://www.barschool.net/wp-content/uploads/2014/12/BARTENDER1.jpg','gabe',1,1,1,1,1,'duane',1,'Great Job Gabe!!!',1,'2018-03-19 00:43:00','2018-03-19 04:10:27',3),
	(5,'Meal Prep',25.00,'Culinary','I will prep. Your meals for you',NULL,0,'Monday','https://greatist.com/sites/default/files/Chicken%20Meal%20Prep.jpg','gabe',1,1,1,1,1,'duane',1,'Thanks Again Gabe',1,'2018-03-19 00:43:41','2018-03-20 15:37:33',3),
	(6,'Learn to Code',15.00,'Instruction','Learn to code JavaScript and many other  Languagaes',NULL,0,'Friday','https://s7d2.scene7.com/is/image/dkscdn/17GTXWLGNPRXXXXXXPRF_Green_is/','gabe',0,0,0,0,0,'duane',NULL,NULL,0,'2018-03-19 00:44:26','2018-03-19 04:40:14',3),
	(7,'Take you Shopping',100.00,'Instruction','I will remake your Closet',NULL,0,'Sunday','https://vignette.wikia.nocookie.net/phobia/images/f/f0/Shopping.jpg/revision/latest?cb=20170101050751','keka',0,0,0,0,NULL,NULL,NULL,NULL,0,'2018-03-19 00:45:26','2018-03-19 00:45:26',2),
	(8,'Dog Walking',40.00,'Childcare','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.',NULL,0,'Thursday','https://s7d2.scene7.com/is/image/dkscdn/17GTXWLGNPRXXXXXXPRF_Green_is/','keka',0,0,0,0,NULL,NULL,NULL,NULL,0,'2018-03-19 00:46:04','2018-03-19 00:46:04',2),
	(9,'Home Design Consult',500.00,'Instruction','Get  the home of your dreams',NULL,0,'Thursday','https://s.hdnux.com/photos/56/71/52/12294786/13/920x1240.jpg','keka',0,0,0,0,0,'duane',NULL,NULL,0,'2018-03-19 00:46:45','2018-03-19 04:40:49',2),
	(10,'Car Details',150.00,'Auto Maintenance','Get that car shinning like new',NULL,0,'Saturday','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_sL6T7JciXM1gq89EvPqFJXN4cl0wKzSm7HwNP6tmELBhgr_H','antoine',0,0,0,0,NULL,NULL,NULL,NULL,0,'2018-03-19 00:47:43','2018-03-20 00:32:18',4),
	(11,'Dinner prepared by Me',50.00,'Culinary','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. ',NULL,0,'Sunday','http://www.barschool.net/wp-content/uploads/2014/12/BARTENDER1.jpg','antoine',0,0,0,0,0,'keka',NULL,NULL,0,'2018-03-19 00:48:24','2018-03-19 04:41:19',4),
	(12,'Plan your next Event',25.00,'Event Planning','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. ',NULL,0,'Sunday','https://greatist.com/sites/default/files/Chicken%20Meal%20Prep.jpg','antoine',0,0,0,0,NULL,NULL,NULL,NULL,0,'2018-03-19 00:49:15','2018-03-19 00:49:15',4),
	(17,'Fake Task',10.00,'Instruction','Fake',NULL,0,'Sunday','','gabe',1,1,1,1,1,'duane',1,NULL,0,'2018-03-20 16:06:22','2018-03-20 17:23:41',3),
	(18,'fffff',33.00,'Instruction','faafda',NULL,0,'Sunday','','duane',1,1,1,1,3,'gabe',1,'Thanks again Duane. Thanks again Duane. Thanks again Duane. Thanks again Duane. Thanks again Duane. Thanks again Duane. Thanks again Duane. Thanks again Duane. Thanks again Duane. Thanks again Duane. Thanks again Duane. Thanks again Duane. ',1,'2018-03-20 17:49:08','2018-03-21 04:36:23',1),
	(19,'another one',40.00,'Instruction','fffff',NULL,0,'Sunday','https://www.incolink.org.au/media/1273/redundancy_workers.jpg?anchor=center&mode=crop&width=1140&height=550&rnd=131087343570000000','duane',1,1,1,1,3,'gabe',1,NULL,0,'2018-03-20 17:56:13','2018-03-20 17:56:46',1),
	(26,'Dinner',10.00,'Instruction','1234',NULL,0,'Sunday','','mike',0,0,0,0,NULL,NULL,NULL,NULL,0,'2018-03-21 04:41:40','2018-03-21 04:41:40',9);

/*!40000 ALTER TABLE `Tasks` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
