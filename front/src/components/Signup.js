import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



function Signup(props) {

    
    const [creds, setCreds] = useState({name:"", email: "", password: "" })
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/auth/api/create-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:creds.name, email: creds.email, password: creds.password})
        })
        
        const data = await response.json()
        console.log(data.success)
        console.log(data.authToken)

        if(data.success === false){
            props.showAlert('Invalid details', 'danger')
        }else{
            props.showAlert('Account created successfully', 'success')
            localStorage.setItem('token', data.authToken)
            navigate('/login')
        }
    }
    const onchange = (e) => {
        setCreds({...creds, [e.target.id]: e.target.value})
    }

  return (
    <div>
      <div className="container bg-body-tertiary p-4"style={{maxWidth: '450px', borderRadius: '20px'}}>
                <form onSubmit={handleSubmit}>
                <h1 className='my-3' >Create new account</h1>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={creds.name} onChange={onchange} required />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" value={creds.email} onChange={onchange} required minLength={3} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={creds.password} onChange={onchange} required  minLength={5}/>
                    </div>
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </form>
                <div className='my-3'>
                   Already have an account <Link className='text-decoration-none' to='/login'>Login </Link>
                    </div> 
            </div>
    </div>
  )
}

export default Signup
