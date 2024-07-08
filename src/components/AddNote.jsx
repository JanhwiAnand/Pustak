import React, { useContext, useState } from "react";
import noteContext from "../context/Notes/noteContext";
function AddNote() {
  const context = useContext(noteContext);
  const { addNote } = context; //destructuring
  //state created and initial values are blank
  const [note, setNotes] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault(); //to avoid page reloading while submitting
    addNote(note.title, note.description, note.tag);
    //after adding set the bas as empty
    setNotes({title:"",description:"",tag:""})
  };
  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value }); //This means that maintaining the previous note, if any new note is added then add that also, in the title and description, by target name( see the input field, name is assigend)
    //...note means the already existing.
    //if ...note is not given then only one field is displayed and the other is not.
  };
  return (
    <>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="title"
              name="title"
              onChange={onChange} value={note.title}
            />
            {/* onChange is an event used in react that fires when there is any change in the field, mostly used in the field related to the forms */}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange} value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange} value={note.tag}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick} disabled={note.title.length<3 || note.description.length<5}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
}

export default AddNote;
