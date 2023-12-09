import React,{ useState} from 'react'
import { Container ,Form ,Button, FormSelect } from 'react-bootstrap';
import '../styles/Signup.css';
import {Link , useNavigate} from 'react-router-dom';
import axios from  'axios';
import API_Url from '../../config/global';
const SignUp = () => {

const [formdata,setFormdata] =useState({
    name:"",
    email:"",
    password:""
});
const handlechange=(e)=>{

    const {name,value}=e.target;
        setFormdata({...formdata, [name]:value})
    }

const handle=async (e)=>{
    e.preventDefault();
    try{
        const response= await axios.post(`${API_Url}/signin/verify`,formdata);
        console.log(response)
        if(response.data===true){
            alert("Registration link is sent to your email")
           }
           else if(response.data===false){
            alert("user already register try to login")
           }
        

    }
    catch(e){console.log(e);}
}


  return (
    <Container>
        <h1> Registration Form</h1>
        <Form onSubmit={handle}>
            <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control type="name" required name="name" value={formdata.name} onChange={handlechange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" required name="email" value={formdata.email} onChange={handlechange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" required name="password" value={formdata.password} onChange={handlechange} />
            </Form.Group>
            <Button varient='primary' type="submit">Register</Button>
            <p>Already have an account? <Link to="login">Login</Link> </p> 
        </Form>
        
    </Container>
  )
}
export default SignUp