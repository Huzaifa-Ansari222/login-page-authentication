//making of server
import { log } from "console";
import express from "express";
import path from "path";

const app = express ();

const users =[];

//make public folder static /using middleware
app.use(express.static(path.join(path.resolve(), "public")))
app.use(express.urlencoded({extended:true}))//can acess data from form

//setting up view engine
app.set("view engine", "ejs")


app.get('/',(req,res)=>{
    res.render("index") 
})

app.get('/success',(req,res)=>{
    res.render("success") 
})
app.post('/',(req,res)=>{
    // console.log(req.body);//acess form response value
    users.push({username:req.body.name, email: req.body.email})//push users data in array
    res.redirect("/success")//after form sumit send user to /sccess
})

app.get("/users",(req,res) => {
    res.json({
        users,
    })
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