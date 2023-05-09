import React, { useContext } from 'react'
import noteContext from '../context/notes/notecontext'



function About() {
const context = useContext(noteContext)
const {theme} = context
  return (
    <div className={`container bg-${theme} text-${theme === 'dark'? 'light': 'dark'}  p-4`}>
      <h1>iNotebokk</h1>
      <p>This is a course project done by dev.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut similique tempora delectus esse dolor aperiam in fugit possimus, earum rerum quod, harum enim!</p>
        </div>
  )
}

export default About
