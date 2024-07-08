import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  //     const s1={
  //         "name":"Janhwi",
  //         "class":"5b"
  //     }
  // const [state,setState]=useState(s1);
  // // after 1sec, the update function will change the name and class,this function was written just to show that functions can also be used through context api's
  // const update=()=>{
  //     setTimeout(() => {
  //         setState({
  //             "name":"Manvi",
  //             "class":"9b"
  //         })
  //     },1000);
  // }

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
    //Get all notes(to fetch all the notes)
  const getNote = async() => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ODQyYTk3MjlmOWM1MmE3NmM0NGU1In0sImlhdCI6MTcxOTk5Mjg1NX0.4BCZJcznR4r7oPKAWM-g8vfB1tsiXcm53GzT3FsKWFE"       
      }
    });
    //the output of the get function will be parsed as json
    const json=await response.json();//response.json is an async function.
    console.log(json);
    setNotes(json)
  }
  
  //Add a Note
  const addNote = async(title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ODQyYTk3MjlmOWM1MmE3NmM0NGU1In0sImlhdCI6MTcxOTk5Mjg1NX0.4BCZJcznR4r7oPKAWM-g8vfB1tsiXcm53GzT3FsKWFE",
      },
      body: JSON.stringify({title,description,tag}), //body data type must match the "Content-Type" herade
    });
   
    console.log("Adding a new note");
    const note =await response.json();
    //setNotes(notes.push(note));//push updates an array
    setNotes(notes.concat(note)); //concat returns an array
  };

  //Delete a Note
  const deleteNote = async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ODQyYTk3MjlmOWM1MmE3NmM0NGU1In0sImlhdCI6MTcxOTk5Mjg1NX0.4BCZJcznR4r7oPKAWM-g8vfB1tsiXcm53GzT3FsKWFE",
      },       
    });
    const json =await response.json();
    // const json=await response.json();
    console.log(json);

    console.log("Deleating the note with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    }); //filter takes an arrow function,here this means that notes will contain only those notes where _id is not equal to the id which needs to me removed
    //npw setNote to newNote
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async (_id, title, description, tag) => {
    //API call(syntax for the api call(fetch from the header))
    const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {//here path copied from update note endpoint, here _id is the id created of the new note
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ODQyYTk3MjlmOWM1MmE3NmM0NGU1In0sImlhdCI6MTcxOTMzNTMwNH0.-aOHhZ7QgAV0cfbFJ6jqdC2U-F0fUOiTGiK0zWSc3mE",//auth token also taken from the header of the update note end point from thunderclient
      },
      body: JSON.stringify({title,description,tag}), //body data type must match the "Content-Type" herade
    });
    const json = await response.json();
    console.log(json);
    //to update the frontend part
    //logic to edit
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === _id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        //break;//after editing, break out from the loop and setnotes to the updated note
      }
      
    }
    //here we could have used setNote as well and do some chnages in that but instead we used the function which we already created,ie.,getNote(), that will bring the data from the backend, so now, the notes will be set to the updated one.
    //bebefits of using this:-
    //1.Code reusability
    //2.we are fetching data from the backend, so updated notes comming from the backend ensuring that the notes are updated in the backend part 1st and then in fronend
    getNote();//to show the changes in frontend as well
    //vdo 67
  };

  return (
    // whatever will be passed in side the NoteState all will become the children of the ,go to app.js and wrap all inside the notestate
    // <NoteContext.Provider value={{state,update}}>
    <NoteContext.Provider
      value={{ notes,addNote, deleteNote, editNote ,getNote}}
    >
      {/* according to modern js, writing anything directly is also valid ,like, instead of writing {{state:state,update:update}}, its written direcly and thats also an object */}
      {/* here telling that whatever you need to give , pass it in value */}
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
