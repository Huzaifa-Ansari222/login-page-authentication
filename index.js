//making of server
import express from "express";
import path from "path";

const app = express ();

//make public folder static /using middleware
app.use(express.static(path.join(path.resolve(),"public")))
app.use(express.urlencoded({extended:true}))//can acess data from form

//setting up view engine
app.set("view engine","ejs")


app.get('/',(req,res)=>{
    res.render("index") 
})
app.post('/',(req,res)=>{
    
})

app.listen(3000,() => {
    console.log("Server is working");
})

































// app.get('/',(req,res)=>{
//     // res.send("hi")
//     // res.sendStatus(400).send("hi")
//     // res.json({
//     //     sucess: true,
//     //     products : [1,2],
//     // })
//     // const pathLocation = path.resolve();
//     // res.sendFile(path.join(pathLocation,"./index.html"));
//     res.render("index") 
// })

// app.get('/',(req,res)=>{
//     res.sendFile("index")
// })