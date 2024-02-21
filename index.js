//making of server
import express from "express";
import path from "path";
import mongoose from "mongoose";


mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName:"todoBackend",
})
.then(() => console.log("Database connected"))
.catch((err) => console.log(err))

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
});
const Message = mongoose.model("Message",messageSchema)//model = collection

const app = express ();

// const users =[];

//make public folder static /using middleware
app.use(express.static(path.join(path.resolve(), "public")))
app.use(express.urlencoded({extended:true}))//can acess data from form

//setting up view engine
app.set("view engine", "ejs")


app.get('/contact',(req,res)=>{ //contact form get method
    res.render("index") 
})

app.get('/success', (req,res)=>{ //sucess page 
    res.render("success") 
})
app.post("/contact", async (req,res)=>{ //post method 
    const { name, email } = req.body; // name:req.bodyname, email: req.body.email,
    await Message.create({
        name: name,
        email: email,
    })//add  form data to database
    res.redirect("/success")//after form sumit send user to /sccess
})

app.get("/users", (req,res) => { // data api on / users[]
    res.json({
        users,
    })
})

app.get('/add',async (req,res) =>{
    await Message.create({
        name:"huzzz",
        email:"huzzgmail.com"
    })
    res.send("data added")
})

app.listen(5000,() => {
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