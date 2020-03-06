DROP TABLE IF EXISTS `records`;

CREATE TABLE `records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `add` int(11) NOT NULL,
  `mark` int(11) NOT NULL,
  `note` varchar(100) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `opinions`;

CREATE TABLE `opinions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `opinion` text NOT NULL,
  `src` text NOT NULL,
  `wechat` varchar(20) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;