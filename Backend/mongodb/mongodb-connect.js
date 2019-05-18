'use strict'

let mongoose= require('mongoose');
let mongoDB = 'mongodb+srv://is702396_:alvaro1.@cluster0-xftk7.mongodb.net/test?retryWrites=true'
mongoose.connect(mongoDB,{
    useNewUrlParser: true,
    useCreateIndex: true});
let db = mongoose.connection;

module.exports = {mongoose};
