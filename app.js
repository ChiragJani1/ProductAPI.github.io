const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user")
const mongoose = require("mongoose");

const app  = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use("/",userRoutes)

//Connect With Mongodb DataBase
mongoose.connect("mongodb+srv://chirag:chirag@cluster0.fmi5h.mongodb.net/ProductMaster?retryWrites=true&w=majority", ()=>{
    console.log("Connected With DataBase")

    //App will listen to 8000 Port
    app.listen( 8000, ()=>{
        console.log("Server Started Listening to Port 8000")
    } )
})
