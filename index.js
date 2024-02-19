//making of server
import express from "express";

const app = express ();

app.get('/',(req,res)=>{
    res.send("hi")
})

app.listen(5000,() => {
    console.log("Server is working");
})



