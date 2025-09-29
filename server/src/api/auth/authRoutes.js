import express from "express";
import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";

const router=express.Router();
const JWT_SECRET=process.env.JWT_SECRET || "";


//helper function for jwt validity
function createToken(user){
    return jwt.sign(
        {id:user.id,email:user.email,name:user.name},
        JWT_SECRET,
        {expires_In:'1h'}
    );
}

//route for signing up
router.post('/signup',async(req,res)=>{
    const db=req.app.get('db');
    const { name ,email ,password } =req.body;
    if(!name || !email || !password)
        return res.status(400).json({message: "missing some of required fields"});

    try{
        const [existingUser]=await db.execute('SELECT  id FROM users WHERE email=?',[email]);
            if(existingUser.length>0){
                return res.status(409).json({message:"user already exists"});
            }

            const hashedPassword=await bcrypt.hash(password,10);
            await db.execute('INSERT INTO users(name,email,password) VALUES(?, ?, /?)',[name,email,password]);
            return res.status(201).json({message:"Signup is successful"});
       } catch(error){
         return res.status(500).json({message:"internal error"});
       }
});


//routes for login
router.post('/login', async(req,res) =>{
    const db=req.app.get('db');
    const { email, password }=req.body;
    if(!email || !password){
        return res.status(401).json({message:"missing some of the required fields"});

        try{
            const [users]=await db.execute('SELECT id,name,email FROM users WHERE email= ?',[email]);
            if(users.length===0){
                return res.status(401).json({message:"Invalid credential"});
            }
            const user=users[0];
            const passwordMatches=await bcrypt.compare(password, user.password);
            if(!passwordMatches){
                return res.status(401).json({message:"invalid credentials"});
            }
            const token=createToken(user);
            res.cookie('token',token, { httpOnly: true, sameSite: 'lax' });
            res.json({message:"Login successful",token});
        } catch(error){
            res.status(500).json({message:"Internal server error"});
        }
    }
});