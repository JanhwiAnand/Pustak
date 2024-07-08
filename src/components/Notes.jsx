import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/Notes/noteContext';
import { useNavigate } from 'react-router-dom';
import Notesitem from './Notesitem';
import AddNote from './AddNote';
function Notes() {
    const navigate=useNavigate();
        const context=useContext(noteContext);
    const {notes,getNote,editNote}=context;//destructuring
    useEffect(()=>{
        if(!localStorage.getItem('token')){//if token got then fetch the notes otherwise 1st sign up
            navigate("/login")
        }
        else{
            getNote();

    }
  },[])
   const ref = useRef(null)//useRef used used to give reference to any element, ie, to refer the element
   const refClose = useRef(null)
    const [note, setNote] = useState({id:"",etitle: "", edescription: "", etag: ""})

    const updateNote = (currentNote) => {
        ref.current.click();//when click is made to refer, then current is used with it, not written directly
        setNote({id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }

    const handleClick = (e)=>{
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        e.preventDefault(); //avoid page reloading
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <>
    {/* <AddNote/>
    <div className="row my-3">
      <h2>Your Notes</h2>
     {notes.map((note)=>{
      return <Notesitem key={note._id} udpdateNote={updateNote} note={note}/>;//here _id is identified because notes is used from the context, we must pass key when we are using the map function, and key must be unique so id is passed.for each notes, we are returning the Notesitem
    //   here props passed as note={note}
     })}
      </div> */}
      <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary" disabled={note.etitle.length<3 || note.edescription.length<5}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">

                <h2>You Notes</h2>
               <div className="container"> {notes.length===0 &&  "No Notes to be displayed"}</div>
                {notes.map((note) => {
                    return <Notesitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
    </>
  )
}

export default Notes
