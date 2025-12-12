const express=require("express");
const toDo=require("./route/to-do");

//MongoDb connection
const dotenv=require("dotenv");
//import data connection file
const Db_Connection=require("./databaseConnection");

dotenv.config();
Db_Connection();


const app=express();
const port=3000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Home Page!"
    });
});

app.use("/todo", toDo)

app.listen(port, ()=>{
    console.log(`Server is up and running on http://localhost:${port}`);
});