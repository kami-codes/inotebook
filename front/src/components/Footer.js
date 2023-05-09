import React, { useContext } from 'react'
import noteContext from '../context/notes/notecontext'

function Footer() {

    const context = useContext(noteContext)
    const {theme} = context

    return (
    <div className={`${theme === 'dark'? 'bg-dark text-light': 'bg-body-tertiary'} container-fluid text-center py-2`} style={{position: 'absolute', bottom:'0px'}}>
      Code-by-Dev
    </div>
  )
}

export default Footer
