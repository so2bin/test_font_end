'use strict';
const express = require('express');
const path = require('path');

const router = module.exports = express.Router();

router.use('/',function (req, res, next) {
  res.sendFile(path.join(__dirname,'../public/html/index.html'));
});