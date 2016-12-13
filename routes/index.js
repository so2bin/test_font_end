'use strict';
const express = require('express');
const path    = require('path');
const mondb   = require('../db/mongo');

const router = module.exports = express.Router();

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

router.get('/list',function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/list.html'));
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
        res: JSON.parse(itm.res),
        gate: itm.gate
      });
    });
    return res.end(JSON.stringify(result));
  });
});

router.post('/data', function (req, res, next) {
  let url     = req.body.url;
  let resData = req.body.resData;
  let gate = req.body.gate || '';
  if(!url || !resData){
    return res.end(JSON.stringify({code: 100, msg: 'empty url or json'}));
  }
  mondb.dataModel.find({url: url}, function (err, data) {
    if (err) {
      return res.end(JSON.stringify({code: 100, msg: err}));
    }
    if (data.length == 0) {
      mondb.dataModel.create({url, res: resData, gate}, function (err) {
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
  });
});

/**
 * 测试服务器入口, 返回json结构, 请求参数带上如?url=/D10/realtime
 */
router.get('/test',function (req,res,next) {
  let url=req.query.url;
  let gate = req.query.gate || '';
  if(!url)
    return res.end(JSON.stringify({code:1003, msg:'empty url'}));
  mondb.dataModel.findOne({url, gate}, function (err, data) {
    if (err) {
      return res.end(JSON.stringify({code: 100, msg: err}));
    }
    let result = {
      code: 0,
      msg : []
    };
    if(data==null){
      return res.end(JSON.stringify(result));
    }
    let reStr = JSON.parse(data.res);
    result.msg.push({
      url: data.url,
      res: reStr,
      gate: data.gate
    });
    res.writeHead(200, {"Content-Type": "application/json"});
    return res.end(JSON.stringify(result));
  });
});

/**
 * list all the data in db
 */
router.get('/list',function (req, res, next) {
  let result = {
    code: 0,
    msg : []
  };
  mondb.dataModel.find(function (err, data) {
    if (err) {
      res.end(JSON.stringify({code: 100, msg: err}));
    }
    data.forEach(function (itm) {
      let reStr = JSON.parse(itm.res);
      result.msg.push({
        url: itm.url,
        res: JSON.parse(reStr),
        gate: itm.gate
      });
    });
    res.writeHead(200, {"Content-Type": "application/json"});
    return res.end(JSON.stringify(result));
  })
});

router.delete('/list',function (req, res, next) {
  let url = req.body.url;
  let gate = req.body.gate || "";
  let result = {
    code: 0,
    msg : []
  };
  mondb.dataModel.remove({url:url,gate},function (err, data) {
    if (err) {
      res.code = 100;
      result.msg = err;
      res.end(JSON.stringify(result));
    }
    res.msg = 'success';
    return res.end(JSON.stringify(result));
  });
});