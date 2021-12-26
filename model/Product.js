const { Module } = require('module');
const { ObjectId } = require('mongodb');
let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let Product = new Schema({
    ProductId: {type:ObjectId,required: true, auto:true},
    ProductName: String,
    qtyPerUnit: Number,
    unitPrice: Number,
    unitInStock: Number,
    discontinued: Boolean,
    categoryId: Number

})

module.exports = mongoose.model("Product", Product)