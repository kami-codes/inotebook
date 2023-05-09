import React, {useContext} from 'react'
import noteContext from '../context/notes/notecontext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'
import Note from './Note'

function Home(props) {
  const context = useContext(noteContext)
  const {note, setnote} = context
  return (
    <div>
      <Note showAlert = {props.showAlert}  />
    </div>
  )
}

export default Home
