const mongoose=require("mongoose");

function DbConnection(){
const url=process.env.MONGO_URI;
mongoose.connect(url)
.then(()=> console.log("MongoDb Connected"))
.catch((err)=>console.log(err));

const DB=mongoose.connection;

DB.on("error", console.error.bind(console, "Connection Error"));
DB.once("open",function(){
    console.log("Database Connection Successfull...");
});

}

module.exports=DbConnection;