import React, { useContext } from 'react'
import noteContext from '../context/notes/notecontext'


function NoteItem(props) {

    const {note, updateNote} = props
    const context = useContext(noteContext)
    const { deleteNote, theme } = context
    return (

        <div className='col-md-3'>

            <div className={`card text-bg-${theme === 'dark'? 'dark': 'light'}   my-2 mx-1`} style={{ boxSizing: 'border-box' }} >
                <div className='card-block'>
                    <div className="fontawesome" style={{float: 'right'}}>
                        <i className="fa-solid fa-pen-to-square" style={{margin: '5px'}} onClick={()=>{updateNote(note)}} ></i>
                        <i className="fa-solid fa-trash" style={{margin: '5px'}} onClick={()=>{
                            props.showAlert('successfully deleted', 'warning')
                            deleteNote(note._id)}}></i>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className={`card-text ${theme === 'dark'? 'opacity-75': ''}`}>{note.description}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NoteItem
