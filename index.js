//making of server
import express from "express";
import path from "fs"
const app = express ();

app.get('/product',(req,res)=>{
    // res.send("hi")
    // res.sendStatus(400).send("hi")
    // res.json({
    //     sucess: true,
    //     products : [1,2],
    // })

     1:09 hr

})

app.listen(5000,() => {
    console.log("Server is working");
})



