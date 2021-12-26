let express = require("express");
let bodyParser = require("body-parser");
let userRoutes = require("./routes/user")
let mongoose = require("mongoose");

let app  = express();

app.use(express.json())
app.use(bodyParser.urlencoded({urlencoded:true}));

app.use("/",userRoutes)

//Connect With Mongodb DataBase
mongoose.connect("mongodb+srv://chirag:chirag@cluster0.fmi5h.mongodb.net/ProductMaster?retryWrites=true&w=majority", ()=>{
    console.log("Connected With DataBase")

    //App will listen to 8000 Port
    app.listen( 8000, ()=>{
        console.log("Server Started Listening to Port 8000")
    } )
})
