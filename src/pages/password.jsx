import React from 'react'
import { Container,Form ,Button} from 'react-bootstrap'
import { useState } from 'react'
import API_Url from '../../config/global'
import axios from "axios"
 const PasswordC = () => {
  const [formdata,setFormdata]=useState({
    email:"",
    password:"",
    Repassword:""
  });
  const onchange =(e)=>{
    const {name,value}=e.target;
    setFormdata({...formdata,[name]:value})
  }
  const handle=async (e)=>{
    e.preventDefault();
    console.log(formdata)
    if(formdata.password === formdata.Repassword){
       alert("Email sent to verifying user")
       await axios.post(`${API_Url}/changepass`,formdata)
       
    }
    else{alert("password Didn't match")}
  }
  return (
    <Container><h1>Change Password</h1>
        <Form onSubmit={handle}>
        <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" required name="email" value={formdata.email} onChange={onchange} />
        </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' required name='password'   onChange={onchange} value={formdata.password}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Retype-password:</Form.Label>
                <Form.Control type='password' required name='Repassword'  value={formdata.Repassword} onChange={onchange}/>
            </Form.Group>
            <br></br>
            <Button varient="primary" type="submit">Submit</Button>
        </Form>
    </Container>
  )
}
export default PasswordC