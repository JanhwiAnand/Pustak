//notes related endpoints are written here
const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator"); //here also for validation, to check that in notes, empty data is not send, otherwise empty will go on stored in the database, so to avoid that this is used here
//this endpoint will fetch all the notes of the user from the database, and that user's notes will be given who is already loged in.


//ROUTE 1: GET all the notes using : GET "api/notes/fetchallnotes".Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  //request,response
 try{
    const notes = await Note.find({ user: req.user.id }); //since the fetchUser is used, so user will store the user
    //find is used because we need to find all
    res.json(notes);
 }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
 }
});


//ROUTE 2: Add a new note using : POST "api/notes/addnote".Login reuired
router.post(
  "/addnote",
  fetchUser,
  [
    //in my notes,title must be there, description, etc and set the character that of how many letter it should be to validate
    body("title", "Enter a valid title").isLength({ min: 1 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    try{
        const {title,description,tag}=req.body;
        //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //if there are no error
    // add all the things that needs to be there in the note
    //destructuring used for this
    const note = new Note({ title, description, tag, user: req.user.id });
    const saveNote=await note.save();
    res.json([saveNote]);
    
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
  }
}
);

//ROUTE 3: Update an existing note note using : POST "api/notes/updatenote".Login required
//POST can be used but for the updation, we use PUT
//here user validation required so that the user can update only is notes and not someone others notes
router.put(
  "/updatenote/:id",//takes id as well
  fetchUser,
  async (req,res)=>{
    const {title,description,tag}=req.body;//three things from notes can be asked to update
    try{
      //create a newNote object
    let newNote={};
    if(title){newNote.title=title};//if title is comming as a part of the request to be updated then we will update it
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
    
    //1st check the user is the one who created the note and one can't update others note
    let note=await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not Found")}

    if(note.user.toString()!==req.user.id){//note.user.toString is gives id and if that does not match the user id that means unautherised user is trying to access
      return res.status(401).send("Not Allowed");
    }

    //Find the note to be updated and update it
     note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})//1st this takes and id, so req.params.id fulfills that and then 2nd will set the new note and the 3rd parameter means that there is new note that needed to be updated so new:true says mongoose that allow the new changes and show the updated one
     res.json({note});//send the note
     //now go to thunder client and create new request inside the notes
    }
    catch(error){
      console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

  }
)
  //ROUTE:4- Delete the existing note using :DELETE api/notes/deletenote".Login required
//POST can be used but for the updation, we use PUT
//here user validation required so that the user can update only is notes and not someone others
//update and delete allmost similar structures
router.delete(
  "/deletenote/:id",//takes id as well
  fetchUser,
  async (req,res)=>{
   
    //1st check the user is the one who created the note and one can't update others note
    try {
      // Find the note to be delete and delete it
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      // Allow deletion only if user owns this Note
      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }
      //allow the deletion only if the user exists

      note = await Note.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted", note: note });//send the note
      //now go to thunderclient and create new request inside the notes for deletion
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
  }
)


module.exports = router;
