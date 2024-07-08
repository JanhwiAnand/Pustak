//import express
//we can't write import statement here as it will give error, that import statement can't be written outside the module

//authentication related endpoints are written here
const express = require("express");
const router = express.Router();
const User = require("../models/User"); //imported user
const bcrypt = require("bcrypt"); //import bycript after npm install bycrypt in the terminal
//Create a User using: POST "/api/auth/"-It does'nt rwquire authentication
// router.post('/',(req,res)=>{//request,response
var jwt = require("jsonwebtoken"); //imported to generate the tokens
const JWT_SECRET = "Janhwiisagoodgir$l";
const fetchUser = require("../middleware/fetchUser"); //imported the fetchUser middleware
//secret data
//validation process
//unique email id of all users
const { body, validationResult } = require("express-validator");

//     // res.json([]);
//     console.log(req.body);//body of request can be used by using a middleware,ie.,app.use(express.json()) in index.js
//     const user=User(req.body);//request body content is written in thunderclient json content
//     user.save();//this will save the data in mongoDB, there go and check inside test->user->click on test button, the data will be displayed
//     res.send(req.body);

//ROUTE-1-Create a user using POST "/api/auth/createuser". No login required
router.post(
  "/createuser",//further things done for validation
  [
    //this is an array which contains the things required to be checked
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email }); //this method return the user
      if (user) {
        //if the same user already exists then return error
        console.log(user);
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      //adding salt to the password to make it secure#vdo-49
      const salt = await bcrypt.genSalt(10); //await means wait ntil this promise gets resolved,then after resolving, salt will get the value and will go to the next line
      secPass = await bcrypt.hash(req.body.password, salt); //returns a promise, so await it

      //create a new user
      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      //for token generation
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET); //sign takes two params, 1st the data and 2nd the secret message
      // res.json(user)
      res.json({ authtoken });
      //return res.json(user);//i was sending the user but now i will send the token,and with that token i will send the id, and the document retrival is the fastest when id used
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

//1st endpoint is createuser, 2nd is login
//authenticate a user#vdo-50
//ROUTE-2:Authenticate a User using :POST "/api/auth/login".No login required
router.post(
  "/login",
  [
    //this is an endpoint
    //for login, email and password verification
    body("email", "Enter a valid email").isEmail(), //if the email is not valid then no sign in, server ko pareshan hi nhi kerna hai
    body("password", "Password cannot be blank").exists(),
    //if password is empty then i don't need to touch the db, simply the error message will be displayed
    //same code as of create user
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body; //destructuring to get the email and password
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false;
        return res
          .status(400)
          .json({ error: "Please try to login with the corect credentials" }); //we did not write about the user exists or not because if someone wants to hack, then why shall i give the info about the user that it exsists or not.
      }
      //now match the password
      const passwordcompare = await bcrypt.compare(password, user.password); //compare the password entered and the original password, compare method takes the args one as string and another one as hash, returns true and false
      if (!passwordcompare) {
        success=false;
        return res
          .status(400)
          .json({ success,error: "Please try to login with the corect credentials" });
      }
      //if correct,then return the id
      const data = {
        user: {
          id: user.id,
        }
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occured");
    }
  }
);
//vdo-51
//ROUTE-3: Get logedin User Details using: POST :/api/auth/getuser".Login required(ie.,we need to send the tokens)
//here we make the same route as we made but this time we will use token(authtoken) and through that we will fetch all the details
//a middleware used to fetch because ->explanation in copy
router.post("/getuser", fetchUser, async (req, res) => {
  //here the "next function is the one which comes after the middleware function"

  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password"); //here find by id and select all the info except the password, so written select("-password")
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
  }
});
//req,res used inside get
module.exports = router;
