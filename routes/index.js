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
    msg: []
  };
  mondb.dataModel.find(function (err, data) {
    data.forEach(function (itm) {
      result.msg.push({
        url: itm.url,
        res: itm.res
      });
    });
    if(err){
      res.end(JSON.stringify({code:100, msg:err}));
    }
    return res.end(JSON.stringify(result));
  })
});

router.post('/data', function (req, res, next) {
  let url     = req.body.url;
  let resData = req.body.resData;
  mondb.dataModel.find({url: url}, function (err,data) {
    if (err) {
      return res.end(JSON.stringify({code: 100, msg: err}));
    }
    if(data.length==0){
      mondb.dataModel.create({url,res:resData}, function (err) {
        if(err)
          return res.end(JSON.stringify({code: 100, msg: err}));
      });
    }else{
      data.res = resData;
      mondb.dataModel.update({url}, {url,res:resData}, function (err) {
        if(err)
          return res.end(JSON.stringify({code: 100, msg: err}));
      });
    }
    return res.end(JSON.stringify({code:0, msg: 'success'}));
  })
});