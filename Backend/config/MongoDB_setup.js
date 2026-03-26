const mongoose = require('mongoose')

const Connection_string  = 'mongodb+srv://chandankoranga02:4lq8zRP1azCC24ux@cluster1.kmhsc5q.mongodb.net/';

async function database(){
   await mongoose.connect(Connection_string);
   console.log('Database Connected succesfully');
}


module.exports = database;