import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials,setCredentials]=useState({email:"",password:""});//object
    const navigate=useNavigate();
    const handleSubmit= async(e)=>{
        e.prevenDefault();//this is used to avoid page reloading
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}),//since in the user login endpoint oin the tunderclient, the body is passed
          });
          const json=await response.json();
          console.log(json);
          if(json.success){//success provided in auth.js just to show that its value is true or false
            // //redirect
            localStorage.setItem('token',json.authtoken);//save token in local storage
            navigate("/");
            
          }
          else{
            //alert
            alert("Invalid Credentials");//this alert is js native alert
          }
         
        }
        const onChange = (e)=>{
            setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    
  return (
    <>
    <form onSubmit={handleSubmit}>
        {/* form gets submit not the bi=utton */}
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="current-password" className="form-label">Password</label>
    <input type="password" className="form-control" id="current-password" name="password" value={credentials.password} onChange={onChange} />
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </>
  )
}

export default Login
