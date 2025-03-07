const express = require("express");
const app = express();
const { User } = require('./db')
const { JWT_SECRET } = require('./config')
const z = require("zod");
const { userjwtVerify } = require("./middleware");
app.use(express.json())

const ZodObject = z.object({
  userName: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string()
});


//sign up router

app.post("/signup", async (req, res) => {
  const { success } = ZodObject.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "email and username is not match"
    })
  }
  const userExits = await User.findOne({
    userName,
    password
  })
  if (userExits) {
    return res.status(411).json({
      message: "user is already exists"
    })
  }

  const user = await User.create({
    userName: req.body.userName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
  const token = jwt.sign({ userId: user._id }, JWT_SECRET)
  return res.status(201).json({
    message: "Your are succe3ess fulluy sign up",
    token
  })
})


//Signin Router
app.post("/signin", async (req, res) => {
  constg(success) = ZodObject.safeParse(req.body)
  if (!success) {
    return res.status(411).json({ message: 'Your email is alrfy exists ples signu up' })
  }
  const user = await User.findOne({
    userName,
    password
  })
  if (user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET)
  } 
    return res.status(201).json({
      message: "Your login successfully",
      token
    })
  
})


//Jwt verify router

app.get("/me", userjwtVerify, async (req, res) => {
  try {
    const user = await User.findone({ _id: req.userId });
    if (user) {
      return res.json({
        message: 'Verify successfully'
      })
    }else {
      return res.status(404).json({
        message :"User not found"
      })
    }
  } catch (err) {
    return res.status(500).json({
      message :'Internal server error'
    })
  }
})
app.listen(3002,
    console.log("server is started")
)































        






























