import express,{Request,Response} from "express";
const app = express(); 
const bcrypt = require ('bcrypt')

import jwt from "jsonwebtoken";
import { UserModel } from "./db";


app.use(express.json());

const JWT_PASSWORD = '123123';

interface User {
    username: string;
    password: string;
  }
  
  const users: User[] = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" },
  ];
  

 
app.post("/signup", async (req, res) => { 
    try {
        const { username, password } = req.body;
        console.log("sign up r0outer are bshow ") 
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({ username, password : hashedPassword });
        res.status(201).json({
            message: "You signed up successfully"
        });
    } catch (error) { 
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/signin", async (req:any, res:any) => {  
   try{
        const { username, password } = req.body;
        console.log(username);
        const userExist = await UserModel.findOne({ username }); 
        
        if (userExist) {
            const token = jwt.sign({ id: userExist._id }, JWT_PASSWORD); 
            res.json({
                message: "Sign in successfully",
                token
            });
        } else {
            return res.status(401).json({ 
                message: "Invalid credentials"
            });
        }
    }catch(e){
        return res.status(500).json({
            message : "Internal server error",
            
        })
    }
    
});



app.listen(3001, () => {
    console.log("Server running on port 4004"); 
});