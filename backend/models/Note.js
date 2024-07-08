//this is a model so name in capital
const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    // Name: String, // String is shorthand for {type: String}
    //one user notes must be separated from other and one should not be able to see other's notes.
    //the notes must be associated with the user, so for this the user section is created and the unique id of that user is used as the foreign key to associate the pages.
    user:{
        type:mongoose.Schema.Types.ObjectId,//it is like a foreign key, it means that the id of the User page is used here
        ref:'user',
    },
    title:{
        type:String,
        required:true
    },
   description:{
        type:"String",
        required:true
    },
    tag:{//tag is  todo item
        type:"String",
        default:"General"
    },
    date:{
        type:"Date",
        // required:true
        default: Date.now
    },
  });
  module.exports=mongoose.model('notes',NotesSchema);