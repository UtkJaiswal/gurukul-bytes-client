import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {url} from '../constants'

function Home() {
  const [user, setUser] = useState([]);
  

  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")){
      getUser();
     
    }
     
    else navigate("/login");
    // eslint-disable-next-line
  }, []);

  const getUser = async () => {
    const response = await fetch(`${url}/api/auth/getUser`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();

    setUser(...user, json);
    
    
  };

 

  return (
    <div className="container">
      <h1>User Details</h1>
      <br />
      {user.map((a) => {
        return (
          <div key={a._id}>
            <h6>First Name: {a.first_name}</h6>
            <h6>Last Name: {a.last_name}</h6>
            <h6>Date of birth: {a.date_of_birth.substr(0, 10)}</h6>
            <h6>Gender: {a.gender}</h6>
            <h6>Email: {a.email}</h6>
            <h6>Address: {a.address}</h6>
            
            <img src={a.profile_picture?`${url}/${a.profile_picture}`:'' } alt="profile-pic" ></img>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
