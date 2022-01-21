import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {url} from '../constants'

const Signup = () => {

    const [credentials, setCredentials] = useState({first_name:"",last_name:"",date_of_birth:"",gender:"",email:"",password:"",address:""})
    let navigate = useNavigate();
    const [files, setFiles] = useState([])
    function handleImageUpload(e) {
        
        setFiles(e.target.files);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const formData = new FormData()
        formData.append('first_name', credentials.first_name);
        formData.append('last_name', credentials.last_name);
        formData.append('date_of_birth', credentials.date_of_birth);
        formData.append('gender', credentials.gender);
        formData.append('email', credentials.email);
        formData.append('password', credentials.password);
        formData.append('address', credentials.address);
        formData.append('profile_picture', files[0]);

        const response = await fetch(`${url}/api/auth/createUser`, {
            method: 'POST',
            //  headers: {
            //      'Content-Type': 'multipart/form-data',
            //      'boundary':"MyBoundary"
            //  },
            
            body: formData
        })
        const json = await response.json();
        
        if(json.success){
            //save the auth token and redirect
            
            localStorage.setItem('token',json.authToken);
            navigate("/")
        }
        else if(json.userExists){
            alert('User with this email already exists')
        }
        else {
            alert('Invalid credentials')
        }
        
    }

    const onChange = (e)=> {
        
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input type="text" className="form-control" name="first_name" id="first_name" aria-describedby="emailHelp" onChange={onChange} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="last_name" id="last_name" aria-describedby="emailHelp" onChange={onChange} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" name="date_of_birth" id="date_of_birth" aria-describedby="emailHelp" onChange={onChange} required></input>
                    
                </div>

                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    
                    <select type="text" className="form-control" defaultValue={"Select"} name="gender" id="gender" aria-describedby="emailHelp" onChange={onChange} required>
                    <option value="Select"disabled={true} > Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" onChange={onChange} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={5} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" id="address" aria-describedby="emailHelp" onChange={onChange} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="profile_picture" className="form-label">Profile Picture :</label>
                    
                    <input type="file"  accept="image/png, image/jpeg" name='profile-picture' id="fileUpload" onChange={handleImageUpload} ></input>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
