//making of server
import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { log } from "console";

//connt to db
mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName:"todoBackend",
})
.then(() => console.log("Database connected"))
.catch((err) => console.log(err))

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});
const User = mongoose.model("User",userSchema)//model = collection

const app = express ();


//make public folder static /using middleware
app.use(express.static(path.join(path.resolve(), "public")))
app.use(express.urlencoded({extended:true}))//can acess data from form
app.use(cookieParser())

//setting up view engine
app.set("view engine", "ejs")

//handler
const isAuthenticated = (req, res ,next) => {
    const token = req.cookies.token; //or can say const {token} = req.cookies
    if (token){ //if login
        
        next();  //60 line handler run
    }
    else{ //if logout
        res.render("login") 
    }
}


app.get('/',  isAuthenticated, (req,res)=>{ 
    res.render("logout") //if have token render this
})

app.post('/login',async (req, res) => {
    // console.log(req.body);
    const {name, email} = req.body
    // get data here 
    const user =  await User.create({ //we get user id here
        name,
        email,
    })
    //inspect>application>cookies
    res.cookie("token",user._id ,{ //token exist  and store user id on token
    httpOnly: true,
    expires: new Date(Date.now()+ 60 * 1000)
    })
    res.redirect("/")
})

app.get('/logout',(req, res) => {
    res.cookie("token",null ,{
    httpOnly: true,
    expires: new Date(Date.now())
    })
    res.redirect("/")
})


app.listen(5000,() => {
    console.log("Server is working");
})
