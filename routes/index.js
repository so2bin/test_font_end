'use strict';
const express = require('express');

const router = module.exports = express.Router();

router.use('/',function (req, res, next) {
  res.end('hello world');
});