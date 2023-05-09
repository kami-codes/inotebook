import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/notecontext'


const Login = (props) => {

    const context = useContext(noteContext)

    const {userName, setuserName} = context

    const [creds, setCreds] = useState({ email: "", password: "" })
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/auth/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: creds.email, password: creds.password})
        })
        
        const data = await response.json()
        const name = await data.name1
        

        if(data.success === false){
            props.showAlert('Invalid details', 'danger')
        }else{
            props.showAlert('Logged in', 'success')
            localStorage.setItem('token', data.authToken)
            localStorage.setItem('username', name)
            localStorage.setItem('theme', 'light')
            navigate('/')
        }
    }
    const onchange = (e) => {
        setCreds({...creds, [e.target.id]: e.target.value})
    }
    return (
        <>
            <div className="container bg-body-tertiary p-4" style={{maxWidth: '450px', borderRadius: '20px'}}>
                <h1 className='my-3' >Login to iNotebook</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" value={creds.email} onChange={onchange}  required  minLength={5}/>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={creds.password} onChange={onchange} required  minLength={5} />
                    </div>
                    <button type="submit" className="btn btn-secondary">Login</button>
                   <div className='my-3'>
                   Don't have a account? <Link className='text-decoration-none' to='/signup'>Sign up </Link>
                    </div> 
                </form>
            </div>
        </>
    )
}

export default Login
