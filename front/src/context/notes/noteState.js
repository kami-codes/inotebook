import React, { useState } from "react";
import NoteContext from "./notecontext";

const NoteState = (props) => {
    const host = 'http://localhost:5000'

    const getNotes = async () => {

        //API call
        const response = await fetch(`${host}/notes/api/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json()
        console.log(json)
        setnote(json)
    }

    const initialnote1 = []

    const [theme, settheme] = useState('light')

    const [noteTheeme, setnoteTheme] = useState('default')

    const [notes, setnote] = useState(initialnote1)

    // Add a note
    const addNote = async (title, description, tag, color) => {
        //API call
        const response = await fetch(`${host}/notes/api/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag, color })
        })
        const note = await  response.json()

console.log(note)
        setnote(notes.concat(note))
    }

    //delete a note
    const deleteNote = async (id) => {

        const response = await fetch(`${host}/notes/api/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const json = await response.json()
        console.log(json)


        console.log('deleting the note' + id)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setnote(newNotes)
    }

    //edit a note
    const editNote = async (id, title, description, tag) => {

        //API call
        const response = await fetch(`${host}/notes/api/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = response.json()

        let newNotes = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index]
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break;
            }
        }
        setnote(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, theme, settheme, noteTheeme, setnoteTheme }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState
