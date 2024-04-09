-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.36 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- sns 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `sns` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sns`;

-- 테이블 sns.tbl_alert 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_alert` (
  `ALERTNO` int NOT NULL AUTO_INCREMENT,
  `USERID` varchar(50) DEFAULT NULL,
  `CONTENTS` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `WATCH` varchar(50) DEFAULT NULL,
  `DATETIME` datetime DEFAULT NULL,
  `TYPE` varchar(50) DEFAULT NULL COMMENT '팔로우, 좋아요',
  PRIMARY KEY (`ALERTNO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns.tbl_alert:~0 rows (대략적) 내보내기

-- 테이블 sns.tbl_board 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_board` (
  `BOARDNO` int NOT NULL AUTO_INCREMENT,
  `USERID` varchar(50) DEFAULT NULL,
  `CONTENTS` varchar(5000) DEFAULT NULL,
  `CDATETIME` datetime DEFAULT NULL,
  PRIMARY KEY (`BOARDNO`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns.tbl_board:~14 rows (대략적) 내보내기
INSERT INTO `tbl_board` (`BOARDNO`, `USERID`, `CONTENTS`, `CDATETIME`) VALUES
	(1, 'test', 'asdasd', '2024-04-05 17:16:48'),
	(2, 'test', 'asdasd', '2024-04-05 17:17:12'),
	(13, 'test', 'asdasd', '2024-04-05 17:26:00'),
	(14, 'test', 'asdasd', '2024-04-05 17:26:09'),
	(15, 'test', 'asdasd', '2024-04-05 17:26:17'),
	(16, 'test', 'ㅁㄴㅇㅁㄴㅇ', '2024-04-05 17:34:03'),
	(17, 'test', '2개 했어요', '2024-04-08 16:10:28'),
	(18, 'test', '움헤헤 이거도 두개', '2024-04-08 17:16:41'),
	(19, 'test', '움하하하', '2024-04-09 14:33:40'),
	(20, 'test', '내가 제일 잘나가', '2024-04-09 15:06:38'),
	(21, 'test', '유후', '2024-04-09 15:16:58'),
	(22, 'asd', '곰돌짱', '2024-04-09 15:18:47'),
	(23, 'asd', '바쁘다 바빠', '2024-04-09 15:19:18'),
	(24, 'asd', '인스타그램입니다', '2024-04-09 16:22:15');

-- 테이블 sns.tbl_board_file 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_board_file` (
  `FILENO` int NOT NULL AUTO_INCREMENT,
  `BOARDNO` int DEFAULT NULL,
  `FILEPATH` varchar(50) DEFAULT NULL,
  `FILENAME` varchar(50) DEFAULT NULL,
  `FILEORGNAME` varchar(50) DEFAULT NULL,
  `FILESIZE` varchar(50) DEFAULT NULL,
  `FILEETC` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`FILENO`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns.tbl_board_file:~19 rows (대략적) 내보내기
INSERT INTO `tbl_board_file` (`FILENO`, `BOARDNO`, `FILEPATH`, `FILENAME`, `FILEORGNAME`, `FILESIZE`, `FILEETC`) VALUES
	(6, 1, 'boardFile/', '1712303967457.png', 'left.png', '593', 'png'),
	(10, 2, 'boardFile/', '1712304235753.png', 'left.png', '593', 'png'),
	(11, 0, 'boardFile/', '1712305110015.png', 'left.png', '593', 'png'),
	(12, 0, 'boardFile/', '1712305146599.png', 'left.png', '593', 'png'),
	(13, 0, 'boardFile/', '1712305163984.png', 'left.png', '593', 'png'),
	(14, 0, 'boardFile/', '1712305215601.png', 'left.png', '593', 'png'),
	(15, 0, 'boardFile/', '1712305236710.png', 'left.png', '593', 'png'),
	(16, 0, 'boardFile/', '1712305250263.png', 'left.png', '593', 'png'),
	(17, 0, 'boardFile/', '1712305285562.png', 'left.png', '593', 'png'),
	(18, 13, 'boardFile/', '1712305560697.png', 'left.png', '593', 'png'),
	(19, 14, 'boardFile/', '1712305569240.png', 'left.png', '593', 'png'),
	(20, 15, 'boardFile/', '1712305577096.png', 'left.png', '593', 'png'),
	(21, 16, 'boardFile/', '1712306043495.png', 'logo.png', '115999', 'png'),
	(22, 17, 'boardFile/', '1712560228905.gif', '1712541590306.gif', '13853', 'gif'),
	(23, 17, 'boardFile/', '1712560228906.png', '1712541441676.png', '833702', 'png'),
	(24, 18, 'boardFile/', '1712564201435.png', '1712541441676.png', '833702', 'png'),
	(25, 18, 'boardFile/', '1712564201440.gif', '1712308541719.gif', '13853', 'gif'),
	(26, 19, 'boardFile/', '1712640820199.png', 'logo.png', '115999', 'png'),
	(27, 19, 'boardFile/', '1712640820200.png', 'logo_gray.png', '69458', 'png'),
	(28, 20, 'boardFile/', '1712642798027.jpg', 'cup-7.jpg', '16841', 'jpg'),
	(29, 21, 'boardFile/', '1712643418763.jpg', 'cup-7.jpg', '16841', 'jpg'),
	(30, 22, 'boardFile/', '1712643527272.jpg', 'bear.jpg', '19738', 'jpg'),
	(31, 23, 'boardFile/', '1712643558116.jpg', 'bear.jpg', '19738', 'jpg'),
	(32, 23, 'boardFile/', '1712643558117.jpg', 'programming.jpg', '15353', 'jpg'),
	(33, 24, 'boardFile/', '1712647335671.png', 'sns-3.png', '1546', 'png');

-- 테이블 sns.tbl_board_like 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_board_like` (
  `BOARDNO` int DEFAULT NULL,
  `USERID` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns.tbl_board_like:~11 rows (대략적) 내보내기
INSERT INTO `tbl_board_like` (`BOARDNO`, `USERID`) VALUES
	(22, 'asd'),
	(21, 'asd'),
	(19, 'asd'),
	(20, 'asd'),
	(18, 'asd'),
	(15, 'asd'),
	(24, 'asd'),
	(23, 'test'),
	(21, 'test'),
	(22, 'test'),
	(24, 'test');

-- 테이블 sns.tbl_comment 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_comment` (
  `COMMENTNO` int NOT NULL AUTO_INCREMENT,
  `USERID` varchar(50) DEFAULT NULL,
  `CONTENTS` varchar(50) DEFAULT NULL,
  `CDATETIME` datetime DEFAULT NULL,
  PRIMARY KEY (`COMMENTNO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns.tbl_comment:~0 rows (대략적) 내보내기

-- 테이블 sns.tbl_friend 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_friend` (
  `USERID` varchar(50) DEFAULT NULL,
  `FRIENDID` varchar(50) DEFAULT NULL,
  `STATUS` varchar(50) DEFAULT NULL COMMENT '팔로잉,차단 상태'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns.tbl_friend:~0 rows (대략적) 내보내기

-- 테이블 sns.tbl_search 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_search` (
  `USERID` varchar(50) DEFAULT NULL,
  `KEYWORD` varchar(500) DEFAULT NULL,
  `CDATE` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns.tbl_search:~0 rows (대략적) 내보내기

-- 테이블 sns.tbl_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `USERID` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `NAME` varchar(50) NOT NULL,
  `PWD` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NICKNAME` varchar(50) DEFAULT NULL,
  `INTRODUCE` varchar(500) DEFAULT NULL,
  `SECRET` varchar(50) DEFAULT NULL,
  `CDATETIME` varchar(50) DEFAULT NULL,
  `PHONE` varchar(50) DEFAULT NULL,
  `FILEPATH` varchar(50) DEFAULT NULL,
  `FILENAME` varchar(50) DEFAULT NULL,
  `FILEORGNAME` varchar(50) DEFAULT NULL,
  `FILESIZE` varchar(50) DEFAULT NULL,
  `FILEETC` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns.tbl_user:~6 rows (대략적) 내보내기
INSERT INTO `tbl_user` (`USERID`, `NAME`, `PWD`, `NICKNAME`, `INTRODUCE`, `SECRET`, `CDATETIME`, `PHONE`, `FILEPATH`, `FILENAME`, `FILEORGNAME`, `FILESIZE`, `FILEETC`) VALUES
	('a', '', 'a', 'a', NULL, NULL, '2024-04-05 10:24:33', NULL, NULL, NULL, NULL, NULL, NULL),
	('asd', '', 'asd', '멋진놈', '나는야 멋쟁이', NULL, '2024-04-05 10:26:09', NULL, 'profileFile/', '1712642465012.png', 'redheart.png', '1360', 'png'),
	('asdf', '', 'asd', 'asd', NULL, NULL, '2024-04-05 10:27:01', NULL, NULL, NULL, NULL, NULL, NULL),
	('qwe', '', 'asd', 'asd', NULL, NULL, '2024-04-05 10:30:55', NULL, NULL, NULL, NULL, NULL, NULL),
	('qwe123', 'qwe', 'qwe', 'qwe', NULL, NULL, '2024-04-05 11:20:11', NULL, NULL, NULL, NULL, NULL, NULL),
	('test', '', '1234', '망그러진 곰', '안녕하세요 저는 망그러진 곰입니다', 'N', NULL, '01063824246', 'profileFile/', '1712560405011.gif', '1712541590306.gif', '13853', 'gif');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
