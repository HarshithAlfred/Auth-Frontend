
import React ,{useState} from 'react';
import {Link , useNavigate} from 'react-router-dom';
import { Form, Button , Container} from 'react-bootstrap';
import axios from  'axios';
import "../styles/Signup.css"
import chat from "../assets/chat2.png"
import "../styles/chat.css"
const Login =()=>{
    const API_Url=import.meta.env.VITE_APIURL;
const [formdata,setFormdata]=useState({
        email:"",
        password:""
    });

const navigate =useNavigate();
const handlechange=(e)=>{
const {name,value}=e.target;
    setFormdata({...formdata, [name]:value})
}
const handle=async (e)=>{
    e.preventDefault();
    try{
       const response =await axios.post(`${API_Url}/login`,formdata);
       console.log(response);
     
        if(response.data=== "Invalid user and password"){
           alert("Invalid user and password try forgot password")
           }
           else if(response.data=== "Server busy"){
           alert("verify your email");
           }
           else if(response?.data){
            localStorage.setItem("userInfo",JSON.stringify(response.data));
            navigate("/home")
           }
      
    }
    catch(e){console.log(e)}

}
  return (
   <div>
     <div className='top'>
            <img src={chat} className='chat'></img>
            <h1 className='head'>Chatz</h1>
             </div>
    <Container>
    <h1> Login Form</h1>
    <Form onSubmit={handle}>
        
        <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" required name="email" value={formdata.email} onChange={handlechange} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" required name="password" value={formdata.password} onChange={handlechange} />
        </Form.Group>
        <Button varient='primary' type="submit">Login</Button>
       
    </Form>
    <p>forgot password ?<Link to="/changepass">Click here</Link></p>
    <p>Dont have an account ?<Link to="/">Signup</Link> </p>
</Container>
</div>)
};

export default Login