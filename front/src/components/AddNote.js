import React, { useContext, useRef, useState } from 'react'
import noteContext from '../context/notes/notecontext'



function AddNote(props) {
    const ref = useRef(null)

    const context = useContext(noteContext)
    const { addNote, theme, noteTheeme, setnoteTheme } = context


    const handlenotetheme = (e) => {
        setnoteTheme(e.target.id)
        localStorage.setItem('notetheme', e.target.id )
        console.log(noteTheeme)
    }
    const [note, setnote] = useState({ title: '', description: '', tag: '', color: localStorage.getItem('notetheme') })
    const handleClick = (e) => {
        e.preventDefault()
        console.log(noteTheeme)
        
        addNote(note.title, note.description, note.tag, note.color)
        setnote({ title: '', description: '', tag: '', color: localStorage.getItem('notetheme') })
        ref.current.click()
        props.showAlert('successfully added', 'warning')
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (<>

        {/* bootstrap experiment */}
        {/* <!-- Button trigger modal --> */}
        <div className='text-center my-2'>
            <button type="button" className={` btn btn-${theme === 'dark' ? 'light' : 'secondary'} btn-lg rounded-circle`} data-bs-toggle="modal" data-bs-target="#addnote">
                <strong>+</strong>
            </button>
            <p className={`text-${theme === 'dark' ? 'light' : 'secondary'}`}>Add a note</p>
        </div>

        {/* <!-- Modal --> */}
        <div className="modal fade " id="addnote" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered ">
                <div className={`modal-content   ${note === 'dark' ? 'bg-dark text-white' : ''}  `}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add a Note</h1>
                        <button type="button" ref={ref} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required />
                            </div>
                            <div className="mb-3 ">
                                <label className="form-label" htmlFor="tag">tag</label>
                                <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                            </div>
                            {/* <div className='mb-3' >

                                <input type="radio" className="btn-check" name="options-outlined" id="secondary-outlined" autocomplete="off" />
                                <label onClick={handlenotetheme} className="btn btn-outline-secondary" id='light' for="secondary-outlined">Light</label>

                                <input type="radio" className="btn-check" name="options-outlined" id="dark-outlined" autocomplete="off" />
                                <label onClick={handlenotetheme} className="mx-1 btn btn-outline-dark" id='dark' for="dark-outlined">Dark</label>

                                <input type="radio" className="btn-check" name="options-outlined" id="success-outlined" autocomplete="off" />
                                <label onClick={handlenotetheme} className="mx-1 btn btn-outline-success" id='success' for="success-outlined">Green</label>

                                <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autocomplete="off" />
                                <label onClick={handlenotetheme} className="mx-1 btn btn-outline-danger" id='danger' for="danger-outlined">Red</label>

                                <input type="radio" className="btn-check" name="options-outlined" id="primary-outlined" autocomplete="off" />
                                <label onClick={handlenotetheme} className="mx-1 btn btn-outline-primary" id='primary' for="primary-outlined">Blue</label>

                                <input type="radio" className="btn-check" name="options-outlined" id="warning-outlined" autocomplete="off" />
                                <label onClick={handlenotetheme} className="mx-1 btn btn-outline-warning" id='warning' for="warning-outlined">Yellow</label>
                            </div>
 */}

                            <div>
                                <button disabled={note.title.length < 5 || note.description.length < 5} onClick={handleClick} type="submit" className="btn btn-secondary">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </>
    )
}

export default AddNote
