/**
 * Created by duoyi on 16-12-12.
 */
const mongoose = require('mongoose');
const config = require('../config/default');

const mon_data = config.mon_data;

mongoose.connect(`mongodb://${mon_data.user}:${mon_data.pwd}@${mon_data.host}:${mon_data.port}/${mon_data.dbName}`, function(err){
    if(err){
        throw err;
    }else{
        console.log('connect to mongodb successfully');
    }
});

const dataSchema = new mongoose.Schema({
  gate: String,
  url: String,
  res: String
});

const dataModel = mongoose.model('urlData', dataSchema);

module.exports={
    dataModel, 
};

