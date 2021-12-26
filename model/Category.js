let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Category Schema
let Category = new Schema({
    categoryId: {type:Number, ref:"products", required:true},
    CategoryName: {type:String, required:true}
});

//Export Category Model
module.exports = mongoose.model("Category", Category)