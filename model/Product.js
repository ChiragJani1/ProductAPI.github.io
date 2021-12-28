const { Module } = require('module');
const { ObjectId } = require('mongodb');
let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let Product = new Schema({
    ProductId: {type:ObjectId,required: true, auto:true},
    ProductName: {type:String, required: true},
    qtyPerUnit: {type:Number, required: true},
    unitPrice: {type:Number, required: true},
    unitInStock: Number,
    discontinued: {type:Boolean, required: true},
    categoryId: Number

})

module.exports = mongoose.model("Product", Product)