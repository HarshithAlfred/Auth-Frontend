import React, { useEffect , useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from  'axios';
import chat from "../assets/chat2.png"
import "../styles/chat.css"
function Home() {  
  const API_Url=import.meta.env.VITE_APIURL
  const [resl,setresl]=useState([]);
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
      if(response.data ==="Invalid Token"){
        alert("login again")
      }
      else if(response.data==="Server busy"){
         alert("Unauthorized login")
      }
      else if(response?.status){
        setresl(response.data);
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
      <h1>Welcome to <p>Chatz</p></h1>
      <p style={{textAlign:'center'}}>We are here to serve you </p>
      <p className='craz'>{resl.name}</p>
      <Link to="/chat"><Button>get started</Button></Link>
    </Container>
    </div>
  )
}

export default Home