import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/notecontext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom'

function Note(props) {
  let navigate = useNavigate()
  const context = useContext(noteContext)
  const { notes, getNotes, editNote, theme } = context
  

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }else{
      navigate('/login')
    }
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setnote] = useState({id:'', etitle: '', edescription: '', etag:''})

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  }
  
  const handleClick =(e)=>{
    e.preventDefault()
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click()
    props.showAlert('successfully updated', 'warning')
  }
  
  const onChange =(e) =>{
      setnote({...note, [e.target.name]: e.target.value})
  }

  return (
    <>

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content ${theme === 'dark'? 'bg-dark text-white': ''}  `}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit the note</h1>
              <button ref={refClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' onChange={onChange}  value={note.etitle}  minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' onChange={onChange} value={note.edescription} minLength={5} required />
                </div>
                <div className="mb-3 ">
                  <label className="form-label" htmlFor="etag">tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' onChange={onChange} value={note.etag} />
                </div>
                {/* <button onClick={handleClick} type="submit" className="btn btn-primary">Add</button> */}
              </form>
            </div>
            <div className="modal-footer">
              
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-secondary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-dialog modal-dialog-centered">

      </div>

      <div>
        <AddNote showAlert={props.showAlert} />
        <div className="container">
          <div className="row my-2 card-deck">
            <div className="container">
            {notes.length === 0 && <div className={`text-${theme === 'dark'? 'light': ''}`}> Looks like you havent added any notes yet </div>}
            </div>
            {notes.map((note) => {
              return <NoteItem showAlert={props.showAlert} key={note._id} note={note} updateNote={updateNote} />
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Note