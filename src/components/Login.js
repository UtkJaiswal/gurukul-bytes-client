import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {url} from '../constants'
const Login = () => {

    const [credentials, setCredentials] = useState({email:"",password:""})
    let navigate = useNavigate();
    let reload=false;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${url}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const json = await response.json();
        
        if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/")
            if(!reload){
                window.location.reload();
                reload=true;
            }
        }
        else if(json.waitForFiveMinutes){
            alert('Incorrect login limit exceeded. Please try after 5 minutes')
            setCredentials({email:"",password:""})
        }
        else {
            alert('Invalid credentials')
            setCredentials({email:"",password:""})
        }
        
    }

    const onChange = (e)=> {
        
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
