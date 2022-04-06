/*
 * @Author: your name
 * @Date: 2022-04-06 14:54:48
 * @LastEditTime: 2022-04-06 17:43:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /node/app.js
 */
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const multer = require('multer');

// 测试一下文件夹是否有读取权限
const test = (file) => {
  try {
    fs.accessSync(file);
  } catch (e) {
    fs.mkdirSync(file);
  }
};

test('./upload/');

const storage = multer.diskStorage({
  destination(req, res, cb) {
    cb(null, './upload/');
  },
  filename(req, file, cb) {
    console.log(file);
    const extname = path.extname(file.originalname);

    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const upload = multer({ storage });

// 单图上传
app.post('/upload', upload.single('logo'), (req, res, next) => {
  const { file } = req;
  console.log('文件类型：%s', file.mimetype);

  console.log('原始文件名：%s', file.originalname);
  console.log('文件大小：%s', file.size);
  console.log('文件保存路径：%s', file.path);
  res.send({ ret_code: '0' });
});

app.listen(3000, () => {
  console.log('服务启动成功：http://localhost:3000');
});
