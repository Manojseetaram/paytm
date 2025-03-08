import express from "express";
const app = express(); 
const bcrypt = require ('bcrypt')
import jwt from "jsonwebtoken";
import { UserModel } from "./db";

import { string } from "zod";
app.use(express.json());

const JWT_PASSWORD = '123123';


 
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

app.get("/verify", (req : any, res:any) => {
    try {
    const token = req.headers["authorization"]; 

    if (!token) {
        return res.status(401).json({
            message: "Invalid token, please sign up"
        });
    }

  
       const decoded = jwt.verify(token, JWT_PASSWORD);
        res.status(200).json({ message: "Token is valid", user: decoded });
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
});


app.listen(4008, () => {
    console.log("Server running on port 4004"); 
});