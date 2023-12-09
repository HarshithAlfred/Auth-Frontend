import React, { useEffect , useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import axios from  'axios';
import API_Url from '../../config/global';

function Home() {  
  const [res,setres]=useState({})
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("userInfo"));
    if (user && user.token){
      getData(user.token)
    }
  })
 const getData= async (token) =>{
    try{
      const config={
        headers:{
          Authorization:token
        }
      }
      const response= await axios.get(`${API_Url}/home`,config);
      console.log(response);
      if(response.data ==="Invalid Token"){
        alert("login again")
      }
      else if(response.data==="Server busy"){
         alert("Unauthorized login")
      }
      else if(response?.status){
        setres(response.data);
      }
    }
    catch(e){console.log(e)}
  }
  return (
    <Container>
      <h1>Welcome to HomePage</h1>
      <p>we are here to serve you </p>
      <p>{res.name}</p>
      <Button> get started</Button>
    </Container>
  )
}

export default Home