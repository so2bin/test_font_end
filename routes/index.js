'use strict';
const express = require('express');
const path    = require('path');
const mondb   = require('../db/mongo');

const router = module.exports = express.Router();

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/data', function (req, res, next) {
  let result = {
    code: 0,
    msg : []
  };
  mondb.dataModel.find(function (err, data) {
    if (err) {
      res.end(JSON.stringify({code: 100, msg: err}));
    }
    data.forEach(function (itm) {
      result.msg.push({
        url: itm.url,
        res: itm.res
      });
    });
    return res.end(JSON.stringify(result));
  })
});

router.post('/data', function (req, res, next) {
  let url     = req.body.url;
  let resData = req.body.resData;
  mondb.dataModel.find({url: url}, function (err, data) {
    if (err) {
      return res.end(JSON.stringify({code: 100, msg: err}));
    }
    if (data.length == 0) {
      mondb.dataModel.create({url, res: resData}, function (err) {
        if (err)
          return res.end(JSON.stringify({code: 100, msg: err}));
      });
    } else {
      data.res = resData;
      mondb.dataModel.update({url}, {url, res: resData}, function (err) {
        if (err)
          return res.end(JSON.stringify({code: 100, msg: err}));
      });
    }
    return res.end(JSON.stringify({code: 0, msg: 'success'}));
  })
});

/**
 * 测试服务器入口, 返回json结构, 请求参数带上如?url=/D10/realtime
 */
router.get('/test',function (req,res,next) {
  let url=req.query.url;
  if(!url)
    return res.end(JSON.stringify({code:1003, msg:'empty url'}));
  mondb.dataModel.findOne({url: url}, function (err, data) {
    if (err) {
      return res.end(JSON.stringify({code: 100, msg: err}));
    }
    let result = {
      code: 0,
      msg : []
    };
    let reStr = JSON.parse(data.res);
    result.msg.push({
      url: data.url,
      res: JSON.parse(reStr)
    });
    res.writeHead(200, {"Content-Type": "application/json"});
    return res.end(JSON.stringify(result));
  })
});