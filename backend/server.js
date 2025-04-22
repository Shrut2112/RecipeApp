import express from "express"
import mongoose from "mongoose"
import User from "./model/User.js"
import bodyParser from "body-parser"
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const app = express()
const port = 3000

dotenv.config(); 
const mongoUrl = process.env.MONGO_URL;

const saltRound = 10;
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


mongoose.connect(mongoUrl)

app.post('/api/auth/login',async(req,res)=>{

    const {username,password} = req.body;
    const user = await User.findOne({username:username})
    if(user && await bcrypt.compare(password,user.password)){
      
      const userData = {
        username:user.username,
        email:user.email,
        image:user.image
      }
        res.status(201).json({message:"Login Successfull",user:userData})
    }
    else{
        res.status(400).json({message:"Invalid Credentials"})
    }
})

app.post('/api/auth/register', async (req, res) => {
    const { username, email, password, image } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const hashpass = await bcrypt.hash(password,saltRound);
        const user = new User({ username, email,password: hashpass, image:image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"});
        await user.save();

      return res.status(201).json({ message: 'Successfully added'});
    
    } catch (error) {
      
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ message: 'User already exists' });
          }
          console.error('Registration error:', error);
          return res.status(500).json({ message: 'Server error' });
    
    }

  });

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})