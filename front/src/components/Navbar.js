import React, { useContext, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/notecontext'


const Navbar = () => {

  const ref = useRef(null)
  const context = useContext(noteContext)
  const {theme, settheme} = context

  const handletheme =()=>{
    if(theme === 'light'){
      settheme('dark')
      document.body.style.backgroundColor = 'rgb(50,50,50)'
    }else{
      settheme('light')
      document.body.style.backgroundColor = 'white'
    }
    ref.current.click()
  }

  let navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  let location = useLocation()
  return (
    <>
      <nav className={`navbar navbar-${theme} navbar-expand-lg bg-${theme}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNotebook</Link>




          {!localStorage.getItem('token') ? "" :
            <div className='d-flex align-items-center '>

              <h6 className={`mx-2 my-0 text-${theme === 'dark' ? 'light' : 'dark'} `}>{localStorage.getItem('username')}</h6>
              <div className="btn-group">
                <button ref={ref} type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-user"></i>
                </button>
                <ul className={`dropdown-menu dropdown-menu-end dropdown-menu-${theme}`}>
                  <li className='px-3 py-1'><Link className={`nav-link ${!localStorage.getItem('token') ? "d-none" : ''} ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link></li>
                  <li className='px-3 py-1'><Link className={`nav-link ${!localStorage.getItem('token') ? "d-none" : ''} ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link></li>
                  <li className='px-3 '>

                    <div className={`float-start form-check-reverse  form-switch py-1`}>
                      <label className="form-check-label" >Dark Mode</label>
                      <input onClick={handletheme} className="form-check-input" type="checkbox" role="switch" />
                    </div>
                  </li>
    
                  <li className='px-3 my-1'>

                    <button className={`btn btn-outline-${theme === "dark" ? 'light': 'secondary'} btn-sm`} onClick={handleLogout}>Logout </button>

                  </li>
                </ul>
              </div>

            </div>}
        </div>
      </nav>
    </>
  )
}

export default Navbar
