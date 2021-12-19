const mongoose = require("mongoose");

const donorSchema = mongoose.Schema({
    _id : {type:String},
    name:{type:String},
    age:{type:Number},
    gender:{type:String},
    phone:{type:Number},
    blood:{type:String}

});

const  donorModel = mongoose.model("donor",donorSchema,"donor");

module.exports = donorModel;
