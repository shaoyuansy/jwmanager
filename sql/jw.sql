/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : jw

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2017-05-01 19:59:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for jw_assign
-- ----------------------------
DROP TABLE IF EXISTS `jw_assign`;
CREATE TABLE `jw_assign` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `JSXM` varchar(30) DEFAULT NULL COMMENT '教师姓名',
  `KCMC` varchar(30) DEFAULT NULL COMMENT '课程名',
  `KCFZR` varchar(30) DEFAULT NULL COMMENT '课程负责人',
  `SSZY` varchar(30) DEFAULT NULL COMMENT '所授专业',
  `SSNJ` varchar(30) DEFAULT NULL COMMENT '所授年级',
  `SSBJ` varchar(30) DEFAULT NULL COMMENT '所授班级',
  `BJRS` varchar(30) DEFAULT NULL COMMENT '班级人数',
  `SKSJ` varchar(30) DEFAULT NULL COMMENT '授课时间',
  `SKDD` varchar(30) DEFAULT NULL COMMENT '授课地点',
  `SFWSJK` varchar(30) DEFAULT NULL COMMENT '是否为上机课',
  `SFDSZ` varchar(30) DEFAULT NULL COMMENT '是否单双周',
  `WPJSPJ` varchar(200) DEFAULT NULL COMMENT '外聘教师评价',
  `TERM` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COMMENT='授课表';

-- ----------------------------
-- Records of jw_assign
-- ----------------------------
INSERT INTO `jw_assign` VALUES ('36', '李想', '体育（1）', '毛泽东', '软件开发与测试', '2015级', '1大班', '1', '1', '1', '是', '是', null, '2016-2017第一学期');
INSERT INTO `jw_assign` VALUES ('37', '施耐庵', '体育（1）', '毛泽东', '嵌入式开发', '2015级', '1大班', '74', '20', '20', '', '', '', null);
INSERT INTO `jw_assign` VALUES ('38', '李想', '计算机英语', '林予松', 'JAVA', '2013级', '1大班', '125', '1', '1', '', '', '', null);
INSERT INTO `jw_assign` VALUES ('39', '李燕超', '体育（3）', '付元忠', 'JAVA', '2014级', '1大班', '125', '2', '2', '是', '否', '', null);
INSERT INTO `jw_assign` VALUES ('41', '施耐庵', '体育（1）', '毛泽东', '嵌入式开发', '2015级', '1大班', '74', '123', '123', '是', '否', '123', '2016-2017第一学期');
INSERT INTO `jw_assign` VALUES ('42', '黎川江', '计算机文化', '李翠霞', '金融信息化', '2016级', '1大班', '60', '', '', '', '', null, '2016-2017第二学期');

-- ----------------------------
-- Table structure for jw_graproject
-- ----------------------------
DROP TABLE IF EXISTS `jw_graproject`;
CREATE TABLE `jw_graproject` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ZYID` int(11) DEFAULT NULL,
  `RS` varchar(50) DEFAULT NULL,
  `JSID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jw_graproject
-- ----------------------------
INSERT INTO `jw_graproject` VALUES ('1', '1', '240', '15');
INSERT INTO `jw_graproject` VALUES ('2', '2', '240', '16');
INSERT INTO `jw_graproject` VALUES ('3', '3', '240', '17');
INSERT INTO `jw_graproject` VALUES ('4', '4', '240', '18');

-- ----------------------------
-- Table structure for jw_jys
-- ----------------------------
DROP TABLE IF EXISTS `jw_jys`;
CREATE TABLE `jw_jys` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `JYSBH` varchar(30) DEFAULT NULL COMMENT '教研室编号',
  `JYSMC` varchar(30) DEFAULT NULL COMMENT '教研室名称',
  `JYSZR` varchar(30) DEFAULT NULL COMMENT '教研室主任',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='教研室信息表';

-- ----------------------------
-- Records of jw_jys
-- ----------------------------
INSERT INTO `jw_jys` VALUES ('1', 'J5637823', '数字媒体', '姬莉霞');
INSERT INTO `jw_jys` VALUES ('2', 'J7465295', '软件工程', '李翠霞');
INSERT INTO `jw_jys` VALUES ('3', 'J5368501', '物联网工程', '史苇杭');

-- ----------------------------
-- Table structure for jw_kc
-- ----------------------------
DROP TABLE IF EXISTS `jw_kc`;
CREATE TABLE `jw_kc` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `KCBH` varchar(30) DEFAULT NULL COMMENT '课程编号',
  `KCMC` varchar(30) DEFAULT NULL COMMENT '课程名称',
  `KCYWMC` varchar(30) DEFAULT NULL COMMENT '课程英文名称',
  `KCFZR` varchar(30) DEFAULT NULL COMMENT '课程负责人',
  `KCLX` varchar(30) DEFAULT NULL COMMENT '课程类型',
  `ZXS` varchar(30) DEFAULT NULL COMMENT '周学时',
  `SJXS` varchar(30) DEFAULT NULL COMMENT '上机学时',
  `XF` varchar(30) DEFAULT NULL COMMENT '学分',
  `SYDX` varchar(30) DEFAULT NULL COMMENT '适用对象',
  `XDKC` varchar(30) DEFAULT NULL COMMENT '先导课程',
  `HXKC` varchar(30) DEFAULT NULL COMMENT '后续课程',
  `JYSHF` varchar(30) DEFAULT NULL COMMENT '教研室划分',
  `ZYFZR` varchar(30) DEFAULT NULL COMMENT '专业负责人',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='课程信息表';

-- ----------------------------
-- Records of jw_kc
-- ----------------------------
INSERT INTO `jw_kc` VALUES ('1', '774154', '体育（1）', 'TYY', '毛泽东', '必修课', '2', '0', '2', '所有专业', '无', '无', '软件工程', '付元忠');
INSERT INTO `jw_kc` VALUES ('2', '774155', '计算机英语', 'JSJYY', '林予松', '必修课', '4', '0', '2', '所有专业', '无', '无', '付元忠暂管', '付元忠');
INSERT INTO `jw_kc` VALUES ('3', '774156', '体育（3）', 'TYS', '付元忠', '必修课', '2', '0', '2', '所有专业', '无', '无', '付元忠暂管', '付元忠');
INSERT INTO `jw_kc` VALUES ('4', '774157', '计算机文化', 'JSJWH', '李翠霞', '必修课', '6', '2', '5', '所有专业', '无', '无', '软件工程教研室', '李翠霞');
INSERT INTO `jw_kc` VALUES ('5', '774158', '毛泽东思想和中国特色社会主义理论', 'MZDSX', '张晗', '必修课', '2', '0', '2', '所有专业', '无', '无', '软件工程教研室', '李翠霞');
INSERT INTO `jw_kc` VALUES ('6', '774159', '马克思主义原理', 'MKSZYL', '张晗', '必修课', '2', '0', '2', '所有专业', '无', '无', '软件工程教研室', '李翠霞');
INSERT INTO `jw_kc` VALUES ('7', '774160', '思想道德与法律基础', 'SXDDYFL', '张晗', '必修课', '2', '0', '2', '所有专业', '无', '无', '软件工程教研室', '李翠霞');
INSERT INTO `jw_kc` VALUES ('8', '774161', '大学英语听说（1）', 'DXYYTSY', '李妍', '必修课', '1', '0', '1', '所有专业', '无', '无', '软件工程', '李翠霞');
INSERT INTO `jw_kc` VALUES ('9', '774162', '大学英语读写（1）', 'DXYYDXY', '李妍', '必修课', '2', '0', '2', '所有专业', '无', '无', '软件工程教研室', '李翠霞');
INSERT INTO `jw_kc` VALUES ('10', '774163', '大学英语听说（3）', 'DXYYTSS', '李妍', '必修课', '1', '0', '1', '所有专业', '无', '无', '软件工程教研室', '李翠霞');
INSERT INTO `jw_kc` VALUES ('11', '774164', '大学英语读写（3）', 'DXYYDXS', '李妍', '必修课', '2', '0', '2', '所有专业', '无', '无', '软件工程教研室', '李翠霞');
INSERT INTO `jw_kc` VALUES ('12', '774165', '高等数学', 'GDSX', '刘成明', '必修课', '5', '0', '5', '所有专业', '无', '无', '软件工程教研室', '李翠霞');
INSERT INTO `jw_kc` VALUES ('13', '774166', '线性代数', 'XXDS', '刘成明', '必修课', '3', '0', '3', '所有专业', '无', '无', '软件工程教研室', '李翠霞');
INSERT INTO `jw_kc` VALUES ('14', '774167', 'HTML5+CSS3', 'HTML', '刘淑芬', '必修课', '3', '0', '3', '人工智能', '无', '无', '软件工程教研室', '李翠霞');

-- ----------------------------
-- Table structure for jw_kc_js
-- ----------------------------
DROP TABLE IF EXISTS `jw_kc_js`;
CREATE TABLE `jw_kc_js` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `KCID` varchar(10) DEFAULT NULL COMMENT '课程ID',
  `JSID` varchar(10) DEFAULT NULL COMMENT '教师ID',
  `TS` varchar(10) DEFAULT NULL COMMENT '选课头数',
  `BZ` varchar(255) DEFAULT NULL COMMENT '备注',
  `CZR` varchar(30) DEFAULT NULL COMMENT '操作人',
  `TERM` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jw_kc_js
-- ----------------------------
INSERT INTO `jw_kc_js` VALUES ('14', '4', '19', '2', '', '乐克鹏', '2016-2017第一学期');
INSERT INTO `jw_kc_js` VALUES ('15', '4', '17', '2', '', '常刘凯', '2016-2017第二学期');
INSERT INTO `jw_kc_js` VALUES ('16', '4', '18', '2', '', '黎川江', '2016-2017第二学期');
INSERT INTO `jw_kc_js` VALUES ('17', '4', '20', '2', '', '王磊', '2016-2017第二学期');
INSERT INTO `jw_kc_js` VALUES ('18', '4', '52', '2', '', '邵远', '2016-2017第二学期');

-- ----------------------------
-- Table structure for jw_teacher
-- ----------------------------
DROP TABLE IF EXISTS `jw_teacher`;
CREATE TABLE `jw_teacher` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `XM` varchar(30) DEFAULT NULL COMMENT '姓名',
  `GH` varchar(30) DEFAULT NULL COMMENT '工号',
  `XB` varchar(30) DEFAULT NULL COMMENT '性别',
  `CSNY` varchar(30) DEFAULT NULL COMMENT '出生年月',
  `LXDH` varchar(30) DEFAULT NULL COMMENT '联系电话',
  `JYSMC` varchar(30) DEFAULT NULL COMMENT '教研室名称',
  `FGFZR` varchar(30) DEFAULT NULL COMMENT '分管负责人',
  `RXSJ` varchar(30) DEFAULT NULL COMMENT '入校时间',
  `SFZHM` varchar(30) DEFAULT NULL COMMENT '身份证号码',
  `MZ` varchar(30) DEFAULT NULL COMMENT '民族',
  `DZSJ` varchar(30) DEFAULT NULL COMMENT '定职时间',
  `RZZT` varchar(30) DEFAULT NULL COMMENT '任职状态',
  `DWH` varchar(30) DEFAULT NULL COMMENT '单位号',
  `DWMC` varchar(30) DEFAULT NULL COMMENT '单位名称',
  `GZDWLB` varchar(30) DEFAULT NULL COMMENT '工作单位类别',
  `XL` varchar(30) DEFAULT NULL COMMENT '学历',
  `ZGXW` varchar(30) DEFAULT NULL COMMENT '最高学位',
  `SFZR` varchar(100) DEFAULT NULL COMMENT '是否专任',
  `BYSJ` varchar(30) DEFAULT NULL COMMENT '毕业时间',
  `BYYX` varchar(30) DEFAULT NULL COMMENT '毕业院校',
  `XY` varchar(30) DEFAULT NULL COMMENT '学院',
  `ZYJSZC` varchar(30) DEFAULT NULL COMMENT '专业技术职称',
  `XKLB` varchar(30) DEFAULT NULL COMMENT '学科类别',
  `SFWSSX` varchar(30) DEFAULT NULL COMMENT '是否为双师型',
  `SFJYGCBJ` varchar(30) DEFAULT NULL COMMENT '是否具有工程背景',
  `SFJYHYBJ` varchar(30) DEFAULT NULL COMMENT '是否具有行业背景',
  `DSLX` varchar(30) DEFAULT NULL COMMENT '导师类型',
  `DQ` varchar(30) DEFAULT NULL COMMENT '地区',
  `KSKC` varchar(30) DEFAULT NULL COMMENT '可授课程',
  `CSDKSJ` varchar(30) DEFAULT NULL COMMENT '初始代课时间',
  `JXXG` varchar(30) DEFAULT NULL COMMENT '教学效果',
  `SFSJSFZFYJ` varchar(30) DEFAULT NULL COMMENT '是否上交身份证复印件',
  `SFSJBYZFYJ` varchar(30) DEFAULT NULL COMMENT '是否上交毕业证复印件',
  `SFSJXWZFYJ` varchar(30) DEFAULT NULL COMMENT '是否上交学位证复印件',
  `SFSJZCZFYJ` varchar(30) DEFAULT NULL COMMENT '是否上交职称证复印件',
  `SFSJJSZGZFYJ` varchar(30) DEFAULT NULL COMMENT '是否上交教师资格证复印件',
  `SFSJGZZFYJ` varchar(30) DEFAULT NULL COMMENT '是否上交工作证复印件',
  `SFSJXYS` varchar(30) DEFAULT NULL COMMENT '是否上交协议书',
  `FJ` varchar(255) DEFAULT NULL COMMENT '附件',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jw_teacher
-- ----------------------------
INSERT INTO `jw_teacher` VALUES ('4', '李想', 'LS004', '男', '1980.02', '13568978454', '软件工程', '王维', '2014.05.21', '4569875846589966', '汉族', '2014.05.21', '在职', 'DW006', '郑州大学', '科研单位', '博士研究生', '博士', '学院教师', '2014.05.21', '郑州大学', '外校（境内）', '副教授', '工学', '是', '是', '是', '博士导师', '境内', '系统架构分析', '35', '优秀', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a1.zip');
INSERT INTO `jw_teacher` VALUES ('5', '王珊珊', 'LS005', '女', '1980.02', '13265598745', '物联网工程', '庆福', '2014.05.06', '4569875846589966', '回族', '2014.05.06', '离职', 'DW006', '北京大学', '科研单位', '本科', '学士', '学院教师', '2014.05.06', '北京大学', '本校', '讲师', '工学', '是', '是', '是', '博士导师', '境内', '人工智能导论', '35', '良好', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a3.zip');
INSERT INTO `jw_teacher` VALUES ('6', '沈可可', 'LS006', '女', '1980.02', '15636258974', '软件工程', '庆福', '2013.04.30', '4569875846589966', '满族', '2013.04.30', '在职', 'DW006', '郑州大学', '高等学校', '本科', '硕士', '学院教师', '2013.04.30', '郑州大学', '外校（境内）', '助教', '教育学', '是', '是', '是', '无', '境内', '数据结构', '35', '优秀', '有', '无', '有', '有', '有', '有', '有', '/zipfiles/a1.zip');
INSERT INTO `jw_teacher` VALUES ('7', '郝亿佳', 'LS007', '女', '1980.02', '15556897454', '数字媒体', '王维', '2016.01.01', '4569875846589966', '汉族', '2016.01.01', '在职', 'DW006', '暨南大学', '高等学校', '硕士研究生', '博士', '其他人员', '2016.01.01', '暨南大学', '外校（境内）', '副教授', '文学', '是', '是', '是', '无', '境内', '人工智能导论', '35', '优秀', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a2.zip');
INSERT INTO `jw_teacher` VALUES ('8', '迪福', 'LS008', '', '1980.02', '13458796584', '软件工程', '友吴', '2016.01.15', '4569875846589966', '汉族', '2016.01.15', '离职', 'DW001', '华中科技大学', '科研单位', '博士研究生', '博士', '其他人员', '2016.01.15', '华中科技大学', '外校（境内）', '副教授', '工学', '是', '是', '是', '博士导师', '境内', '系统架构分析', '35', '优秀', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a2.zip');
INSERT INTO `jw_teacher` VALUES ('9', '何腾', 'LS009', '男', '1980.02', '15968974855', '物联网工程', '李白', '2016.01.30', '4569875846589966', '回族', '2016.01.30', '在职', 'DW004', '郑州大学', '科研单位', '硕士研究生', '硕士', '大校教师', '2016.01.30', '郑州大学', '本校', '讲师', '管理学', '是', '是', '是', '硕士导师', '境内', '系统架构分析', '35', '良好', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a2.zip');
INSERT INTO `jw_teacher` VALUES ('10', '王安祥', 'LS0010', '', '1980.02', '13568978454', '软件工程', '杜甫', '2015.03.21', '4569875846589966', '汉族', '2015.03.21', '在职', 'DW002', '山东大学', '高等学校', '博士研究生', '博士', '学院教师', '2015.03.21', '山东大学', '外校（境内）', '副教授', '哲学', '是', '是', '是', '博士导师', '境内', '人工智能导论', '35', '优秀', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a1.zip');
INSERT INTO `jw_teacher` VALUES ('11', '宋解放', 'LS0011', '男', '1980.02', '13265598745', '数字媒体', '王安石', '2014.05.21', '4569875846589966', '汉族', '2014.05.21', '离职', 'DW003', '郑州大学', '科研单位', '本科', '学士', '其他人员', '2014.05.21', '郑州大学', '本校', '助教', '经济学', '是', '是', '是', '博士导师', '境内', '数据结构', '35', '优秀', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a3.zip');
INSERT INTO `jw_teacher` VALUES ('12', '张福', 'LS0012', '男', '1980.02', '15636258974', '软件工程', '王维', '2016.04.15', '4569875846589966', '满族', '2016.04.15', '在职', 'DW005', '福建大学', '高等学校', '硕士研究生', '硕士', '其他人员', '2016.04.15', '福建大学', '本校', '讲师', '法学', '是', '是', '是', '无', '境内', '人工智能导论', '35', '优秀', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a3.zip');
INSERT INTO `jw_teacher` VALUES ('13', '刘施诗', 'LS0013', '女', '1980.02', '15556897454', '物联网工程', '辛弃疾', '2013.04.30', '4569875846589966', '汉族', '2013.04.30', '在职', 'DW006', '湖南大学', '科研单位', '博士研究生', '博士', '学院教师', '2013.04.30', '湖南大学', '外校（境内）', '副教授', '教育学', '是', '是', '是', '博士、硕士导师', '境内', '系统架构分析', '35', '优秀', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a1.zip');
INSERT INTO `jw_teacher` VALUES ('14', '李燕超', 'LS0014', '男', '1980.02', '13458796584', '物联网工程', '王维', '2016.01.01', '4569875846589966', '回族', '2016.01.01', '离职', 'DW007', '浙江大学', '部队及其他单位', '专科及以下', '无学位', '学院教师', '2016.01.01', '浙江大学', '外校（境内）', '未评级', '文学', '是', '是', '是', '无', '境内', '系统架构分析', '35', '良好', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a2.zip');
INSERT INTO `jw_teacher` VALUES ('15', '王孝双', 'LS0015', '男', '1980.02', '15968974855', '数字媒体', '李白', '2016.01.15', '4569875846589966', '回族', '2016.01.15', '在职', 'DW008', '东北大学', '企业公司', '硕士研究生', '硕士', '学院教师', '2016.01.15', '东北大学', '外校（境内）', '其他中级', '哲学', '是', '是', '是', '无', '境内', '人工智能导论', '35', '良好', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a2.zip');
INSERT INTO `jw_teacher` VALUES ('16', '刘秋源', 'LS0016', '男', '1980.02', '15734567425', '数字媒体', '杜甫', '2016.03.15', '4569875846589966', '汉族', '2016.03.15', '在职', 'DW009', '吉林大学', '其他事业单位', '本科', '学士', '学院教师', '2016.03.15', '吉林大学', '本校', '其他初级', '经济学', '是', '是', '是', '无', '境内', '数据结构', '35', '优秀', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a2.zip');
INSERT INTO `jw_teacher` VALUES ('17', '常刘凯', 'LS0017', '男', '1980.02', '13568978454', '数字媒体', '王安石', '2015.03.21', '4569875846589966', '汉族', '2015.03.21', '在职', 'DW010', '河南大学', '科研单位', '硕士研究生', '博士', '学院教师', '2015.03.21', '河南大学', '外校（境内）', '其他正高级', '法学', '是', '是', '是', '博士、硕士导师', '境内', '人工智能导论', '35', '优秀', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a1.zip');
INSERT INTO `jw_teacher` VALUES ('18', '黎川江', 'LS0018', '男', '1980.02', '13265598745', '软件工程', '王维', '2014.05.21', '4569875846589966', '回族', '2014.05.21', '离职', 'DW011', '安徽大学', '行政单位', '博士研究生', '博士', '学院教师', '2014.05.21', '安徽大学', '外校（境内）', '讲师', '教育学', '否', '是', '是', '硕士导师', '境内', '系统架构分析', '35', '良好', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a3.zip');
INSERT INTO `jw_teacher` VALUES ('19', '乐克鹏', 'LS0019', '男', '1980.02', '15636258974', '数字媒体', '辛弃疾', '2016.04.15', '4569875846589966', '回族', '2016.04.15', '在职', 'DW012', '安徽医科大学', '科研单位', '专科及以下', '博士', '学院教师', '2016.04.15', '安徽医科大学', '外校（境内）', '副教授', '医学', '是', '是', '是', '博士导师', '境内', '系统架构分析', '35', '优秀', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a3.zip');
INSERT INTO `jw_teacher` VALUES ('20', '王磊', 'LS0020', '男', '1980.02', '15556897454', '物联网工程', '李白', '2013.04.30', '4569875846589966', '回族', '2013.04.30', '在职', 'DW013', '清华大学', '科研单位', '博士研究生', '博士', '学院教师', '2013.04.30', '清华大学', '外校（境外）', '教授', '法学', '是', '是', '是', '博士、硕士导师', '境外（国外及港澳台）', '系统架构分析', '35', '优秀', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a1.zip');
INSERT INTO `jw_teacher` VALUES ('21', '施耐庵', 'LS0021', '男', '1980.02', '13458796584', '软件工程', '杜甫', '2016.01.01', '4569875846589966', '汉族', '2016.01.01', '在职', 'DW014', '青岛大学', '科研单位', '博士研究生', '博士', '大校教师', '2016.01.01', '青岛大学', '外校（境外）', '其他正高级', '文学', '是', '是', '是', '博士、硕士导师', '境外（国外及港澳台）', '人工智能导论', '35', '优秀', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a2.zip');
INSERT INTO `jw_teacher` VALUES ('22', '林冲', 'LS0022', '男', '1980.02', '13568978454', '数字媒体', '王安石', '2016.01.15', '4569875846589966', '汉族', '2016.01.15', '离职', 'DW015', '西安大学', '科研单位', '博士研究生', '博士', '其他人员', '2016.01.15', '西安大学', '外校（境内）', '副教授', '工学', '是', '是', '是', '博士导师', '境内', '数据结构', '35', '优秀', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a2.zip');
INSERT INTO `jw_teacher` VALUES ('23', '鲁智深', 'LS0023', '男', '1980.02', '13265598745', '物联网工程', '王维', '2016.03.15', '4569875846589966', '汉族', '2016.03.15', '在职', 'DW016', '厦门大学', '行政单位', '硕士研究生', '硕士', '其他人员', '2016.03.15', '厦门大学', '外校（境内）', '其他中级', '工学', '是', '是', '是', '硕士导师', '境外（国外及港澳台）', '人工智能导论', '35', '良好', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a1.zip');
INSERT INTO `jw_teacher` VALUES ('24', '孙悟空', 'LS0024', '男', '1980.02', '15734567425', '数字媒体', '辛弃疾', '2016.04.01', '4569875846589966', '回族', '2016.04.01', '在职', 'DW017', '北京大学', '科研单位', '本科', '学士', '大校教师', '2016.04.01', '北京大学', '本校', '副教授', '法学', '是', '是', '是', '博士导师', '境内', '系统架构分析', '35', '良好', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a3.zip');
INSERT INTO `jw_teacher` VALUES ('25', '唐生', 'LS0025', '女', '1980.02', '15734567425', '软件工程', '王维', '2016.04.15', '4569875846589966', '汉族', '2016.04.15', '在职', 'DW018', '清华大学', '科研单位', '本科', '无学位', '学院教师', '2016.04.15', '清华大学', '外校（境外）', '副教授', '文学', '是', '是', '是', '博士、硕士导师', '境外（国外及港澳台）', '系统架构分析', '35', '良好', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a3.zip');
INSERT INTO `jw_teacher` VALUES ('26', '王思圆', 'LS0026', '女', '1980.02', '15866626853', '软件工程', '友吴', '2016.04.30', '410527198602152000', '回族', '2016.04.30', '在职', 'DW019', '厦门大学', '高等学校', '硕士研究生', '硕士', '大校教师', '2016.04.30', '厦门大学', '本校', '讲师', '工学', '是', '是', '是', '硕士导师', '境内', '人工智能导论', '35', '良好', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a1.zip');
INSERT INTO `jw_teacher` VALUES ('30', '王五', 'JS0027', '男', '1980.02', '15268974589', '物联网工程', '李燕超', '2016.04.01', '415027193212120023', '汉族', '2016.04.01', '离职', 'DW020', '北京大学', '高等学校', '硕士研究生', '硕士', '大校教师', '2016.04.01', '北京大学', '外校（境内）', '其他正高级', '文学', '否', '是', '否', '博士导师', '境内', '数据结构', '1992.12.03', '优秀', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a2.zip');
INSERT INTO `jw_teacher` VALUES ('31', '微微', 'LS0028', '女', '1980.02', '15866626853', '数字媒体', '李燕超', '2016.04.15', '410527199312160033', '汉族', '2016.04.11', '在职', 'DW021', '厦门大学', '科研单位', '博士研究生', '硕士', '其他人员', '2016.04.15', '厦门大学', '本校', '讲师', '工学', '是', '是', '是', '硕士导师', '境内', '人工智能导论', '2016.04.15', '良好', '有', '有', '有', '有', '有', '有', '有', '/zipfiles/a1.zip');
INSERT INTO `jw_teacher` VALUES ('39', '王五', 'JS0027', '男', '1980.02', '15268974589', '物联网工程', '李燕超', '2016.04.01', '415027193212120000', '汉族', '2016.04.01', '离职', 'DW020', '北京大学', '高等学校', '硕士研究生', '硕士', '大校教师', '2016.04.01', '北京大学', '外校（境内）', '其他正高级', '文学', '否', '是', '否', '博士导师', '境内', '数据结构', '1992.12.03', '优秀', '有', '有', '有', '有', '有', '有', '有', null);
INSERT INTO `jw_teacher` VALUES ('52', '邵远', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '大校教师', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for jw_user
-- ----------------------------
DROP TABLE IF EXISTS `jw_user`;
CREATE TABLE `jw_user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(30) DEFAULT NULL COMMENT '用户名',
  `PASSWORD` varchar(255) DEFAULT NULL COMMENT '密码',
  `YHBH` varchar(30) DEFAULT NULL COMMENT '用户编号（用户为教师时用户编号为工号）',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

-- ----------------------------
-- Records of jw_user
-- ----------------------------
INSERT INTO `jw_user` VALUES ('1', '管理员', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'LS000');
INSERT INTO `jw_user` VALUES ('2', '李想', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'LS004');
INSERT INTO `jw_user` VALUES ('3', '王珊珊', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'LS005');
INSERT INTO `jw_user` VALUES ('4', '沈可可', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'LS006');
INSERT INTO `jw_user` VALUES ('5', '郝亿佳', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'LS007');
INSERT INTO `jw_user` VALUES ('6', '迪福', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'LS008');
INSERT INTO `jw_user` VALUES ('7', '孙悟空', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'LS010');
INSERT INTO `jw_user` VALUES ('8', '黎川江', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'LS011');
INSERT INTO `jw_user` VALUES ('9', '李燕超', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'LS012');
INSERT INTO `jw_user` VALUES ('10', '邵远', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'LS013');
INSERT INTO `jw_user` VALUES ('11', '乐克鹏', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'LS014');
INSERT INTO `jw_user` VALUES ('12', '王磊', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', null);
INSERT INTO `jw_user` VALUES ('13', '常刘凯', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', null);

-- ----------------------------
-- Table structure for jw_zy
-- ----------------------------
DROP TABLE IF EXISTS `jw_zy`;
CREATE TABLE `jw_zy` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ZYBH` varchar(30) DEFAULT NULL COMMENT '专业编号',
  `ZYMC` varchar(30) DEFAULT NULL COMMENT '专业名称',
  `SSJYS` varchar(30) DEFAULT NULL COMMENT '所属教研室',
  `KSNJ` varchar(30) DEFAULT NULL COMMENT '开设年级',
  `BJGS` varchar(30) DEFAULT NULL COMMENT '班级个数',
  `GBDYRS` varchar(30) DEFAULT NULL COMMENT '各班大约人数',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COMMENT='专业信息表';

-- ----------------------------
-- Records of jw_zy
-- ----------------------------
INSERT INTO `jw_zy` VALUES ('1', 'R1250001', 'JAVA', '软件工程', '2013级', '2', '125');
INSERT INTO `jw_zy` VALUES ('2', 'R1250002', 'NET', '数字媒体', '2013级', '1', '52');
INSERT INTO `jw_zy` VALUES ('3', 'R1250003', '网络服务与工程', '物联网工程', '2013级', '2', '150');
INSERT INTO `jw_zy` VALUES ('4', 'R1250004', '软件开发与测试', '软件工程', '2013级', '2', '125');
INSERT INTO `jw_zy` VALUES ('6', 'R1250006', 'JAVA', '软件工程', '2014级', '2', '125');
INSERT INTO `jw_zy` VALUES ('7', 'R1250007', 'NET', '数字媒体', '2014级', '1', '75');
INSERT INTO `jw_zy` VALUES ('8', 'R1250008', '网络服务与工程', '物联网工程', '2014级', '2', '150');
INSERT INTO `jw_zy` VALUES ('9', 'R1250009', '软件开发与测试', '软件工程', '2014级', '2', '125');
INSERT INTO `jw_zy` VALUES ('10', 'R1250010', '嵌入式开发', '物联网工程', '2014级', '1', '70');
INSERT INTO `jw_zy` VALUES ('11', 'R1250011', '金融信息化', '软件工程', '2014级', '2', '120');
INSERT INTO `jw_zy` VALUES ('12', 'R1250012', '软件开发与测试', '软件工程', '2015级', '2', '150');
INSERT INTO `jw_zy` VALUES ('14', 'R1250014', '嵌入式开发', '物联网工程', '2015级', '1', '74');
INSERT INTO `jw_zy` VALUES ('15', 'R1250015', '智能制造信息化', '物联网工程', '2015级', '2', '150');
INSERT INTO `jw_zy` VALUES ('16', 'R1250016', '传媒设计与软件制作', '数字媒体', '2015级', '2', '120');
INSERT INTO `jw_zy` VALUES ('17', 'R1250016', '智能信息', '物联网工程', '2017级', '1', '100');
INSERT INTO `jw_zy` VALUES ('18', 'R1250013', '人工智能', '物联网工程', '2016级', '2', '98');
INSERT INTO `jw_zy` VALUES ('19', 'R1250018', '金融信息化', '数字媒体', '2015级', '2', '100');
INSERT INTO `jw_zy` VALUES ('20', 'R1250019', 'JAVA', '物联网工程', '2016级', '2', '98');
INSERT INTO `jw_zy` VALUES ('21', 'R1250020', '金融信息化', '数字媒体', '2016级', '2', '60');
INSERT INTO `jw_zy` VALUES ('22', 'R1250021', '嵌入式开发', '物联网工程', '2016级', '2', '60');
INSERT INTO `jw_zy` VALUES ('23', 'R1250022', '软件开发与测试', '软件工程', '2016级', '2', '60');
INSERT INTO `jw_zy` VALUES ('24', 'R1250023', 'NET', '软件工程', '2016级', '2', '60');

-- ----------------------------
-- Table structure for jw_zy_kc
-- ----------------------------
DROP TABLE IF EXISTS `jw_zy_kc`;
CREATE TABLE `jw_zy_kc` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ZYID` varchar(30) DEFAULT NULL COMMENT '专业ID',
  `KCID` varchar(30) DEFAULT NULL COMMENT '课程ID',
  `KSXQ` varchar(30) DEFAULT NULL COMMENT '开设学期',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=178 DEFAULT CHARSET=utf8 COMMENT='专业-课程表';

-- ----------------------------
-- Records of jw_zy_kc
-- ----------------------------
INSERT INTO `jw_zy_kc` VALUES ('27', '1', '2', '第七学期');
INSERT INTO `jw_zy_kc` VALUES ('28', '1', '6', '第七学期');
INSERT INTO `jw_zy_kc` VALUES ('29', '2', '2', '第七学期');
INSERT INTO `jw_zy_kc` VALUES ('30', '2', '6', '第七学期');
INSERT INTO `jw_zy_kc` VALUES ('31', '3', '2', '第七学期');
INSERT INTO `jw_zy_kc` VALUES ('32', '3', '6', '第七学期');
INSERT INTO `jw_zy_kc` VALUES ('33', '4', '2', '第七学期');
INSERT INTO `jw_zy_kc` VALUES ('34', '4', '6', '第七学期');
INSERT INTO `jw_zy_kc` VALUES ('37', '6', '3', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('38', '6', '5', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('39', '6', '10', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('40', '6', '11', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('41', '7', '3', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('42', '7', '5', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('43', '7', '10', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('44', '7', '11', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('45', '8', '3', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('46', '8', '5', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('47', '8', '10', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('48', '8', '11', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('49', '10', '3', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('50', '10', '5', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('51', '10', '10', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('52', '10', '11', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('53', '9', '3', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('54', '9', '5', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('55', '9', '10', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('56', '9', '11', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('57', '11', '3', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('58', '11', '5', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('59', '11', '10', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('60', '11', '11', '第五学期');
INSERT INTO `jw_zy_kc` VALUES ('75', '14', '1', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('76', '14', '4', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('77', '14', '7', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('78', '14', '8', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('79', '14', '9', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('80', '14', '12', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('81', '14', '13', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('82', '15', '1', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('83', '15', '4', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('84', '15', '7', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('85', '15', '8', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('86', '15', '9', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('87', '15', '12', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('88', '15', '13', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('89', '16', '1', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('90', '16', '4', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('91', '16', '7', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('92', '16', '8', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('93', '16', '9', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('94', '16', '12', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('95', '16', '13', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('99', '2', '7', '第七学期');
INSERT INTO `jw_zy_kc` VALUES ('101', '12', '3', '第四学期');
INSERT INTO `jw_zy_kc` VALUES ('162', '6', '1', '第四学期');
INSERT INTO `jw_zy_kc` VALUES ('164', '19', '1', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('165', '19', '2', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('166', '19', '3', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('168', '19', '5', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('169', '19', '7', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('170', '19', '10', '第三学期');
INSERT INTO `jw_zy_kc` VALUES ('172', '18', '4', '第二学期');
INSERT INTO `jw_zy_kc` VALUES ('173', '22', '4', '第二学期');
INSERT INTO `jw_zy_kc` VALUES ('174', '23', '4', '第二学期');
INSERT INTO `jw_zy_kc` VALUES ('175', '20', '4', '第二学期');
INSERT INTO `jw_zy_kc` VALUES ('176', '21', '4', '第二学期');
INSERT INTO `jw_zy_kc` VALUES ('177', '24', '4', '第二学期');
