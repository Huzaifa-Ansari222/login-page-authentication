//making of server
import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";

//connt to db
mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName:"todoBackend",
})
.then(() => console.log("Database connected"))
.catch((err) => console.log(err))

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
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
const isAuthenticated = async (req, res ,next) => {
    const token = req.cookies.token; //or can say const {token} = req.cookies
    if (token){ //if login
        const decoded = Jwt.verify(token,"randomSecrect") //id jwt code
        // console.log(decoded);
        req.user = await User.findById(decoded._id) //any auth user can be acess  
        next();  //60 line handler run
    }
    else{ //if logout
        res.redirect("/login") 
    }
}

app.get('/login' ,(req,res) => {
    res.render("login")
})

app.get('/',  isAuthenticated, (req,res) => { 
    // console.log(req.user);// user data
    res.render("logout" ,{name: req.user.name}) //if have token render this
})

app.post('/login', async (req,res)=>{ 
    const {email , password} =req.body;
    let user = await User.findOne({email})

    if(!user) return res.redirect("/register")
    //TO MATCH hash pass
    const isMatch = await bcrypt.compare(password, user.password)// (input datapasss , database password)
    // isMatch = user.password === password; //without hash pass match 

    if(!isMatch) { //WRONG pass
        return res.render("login", {email, message: "Invalid Password!"});
    }
    else{
        const token = Jwt.sign({_id: user._id}, "randomSecrect")
        res.cookie("token",token ,{ //token exist  and store user id on token
        httpOnly: true,
        expires: new Date(Date.now()+ 60 * 1000)
        })
        res.redirect("/")
    }

})

app.get('/register', (req,res)=>{ 
    res.render("register") //
})

app.post('/register',async (req, res) => {
    // console.log(req.body);
    const {name, email, password} = req.body

    let user = await User.findOne({ email })
    if(user){
        return res.redirect("/login");
    }
    //hash pass
    const hashedPassword = await bcrypt.hash(password,10)

    // get data here 
    user =  await User.create({ //we store data 
        name,
        email,
        password: hashedPassword,
    })
    const token = Jwt.sign({_id: user._id}, "randomSecrect")
    // console.log(token);
    res.cookie("token",token ,{ //token exist  and store user id on token
    httpOnly: true,
    expires: new Date(Date.now()+ 60 * 1000)
    })
    res.redirect("/")
})

app.get('/logout',(req, res) => {
    res.cookie("token",null ,{    //inspect>application>cookies
    httpOnly: true,
    expires: new Date(Date.now())
    })
    res.redirect("/")
})


app.listen(5000,() => {
    console.log("Server is working");
})
