import React,{useState,useEffect, useRef} from 'react'
import socketioclient from 'socket.io-client'
import { Container} from 'react-bootstrap'
import axios from "axios"
import chat from "../assets/chat2.png"
import send from "../assets/icons8-sent-48.png"
import "../styles/chat.css"

 //const socketref=React.createRef(null);
//socketref.current= socketioclient(endpoint);
function Chat() {
  const API_Url=import.meta.env.VITE_APIURL
  const [messages,setMessages]=useState([]);
  const [message,setMessage]=useState([]);
  const endpoint="https://chat-tdhw.onrender.com"//import.meta.env.VITE_ENDPOINT
//  const socketref =useRef()
  useEffect(()=>{ 
    const socket = socketioclient(endpoint, {
      path: '/socket.io',
    });
    console.log('things started 1',endpoint)
    socket.on('chat message',(data)=>{
      setMessages((prevMessages)=>[...prevMessages,data])
    });
    console.log('things started 2',endpoint)
    return ()=>{socket.disconnect();};},[]);
  const handle=(e)=>{
    
    if(e.key ==='Enter'){handleSendMessage();}
 }
  
   const handleSendMessage =()=>{
    const socket = socketioclient(endpoint, {
      path: '/socket.io',
    });
    console.log('socket',socket,'endpoint',endpoint)
    const data={name,message}
    socket.emit('chat message',data)
    //setMessages((prevMessages)=>[...prevMessages,data])
    setMessage('')
   }
   const[resl,setresl]=useState();
   useEffect(()=>{
    const user =JSON.parse(localStorage.getItem('userInfo'));
    if(user && user.token){
      gettoken(user.token)
    }});
    async function gettoken(token){
      const config={
        headers:{
          Authorization:token
        }
      }
    
    const response=await axios.get(`${API_Url}/home`,config)
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
   
     
  const name = resl && resl.name ? resl.name:'Admin';
if(name){
  return (
          <div>
            <div className='top'>
            <img src={chat} className='chat'></img>
            <h1 className='head'>Chatz</h1>
             </div>
         
         
          
         <Container>

         <div>
      
      <div>
      <h1 style={{textAlign:'center'}}>#General</h1>
        <ul style={{ paddingLeft:'0'}}>
          {messages.map((msg, index) => (   
            <li key={index} style={{listStyleType: 'none',paddingBottom:'0.4rem',textAlign:msg.name==name?'end':'start'}}>
              <strong style={{color:msg.name==name?'orange':'yellow'}}>{msg.name}:</strong> <span style={{maxWidth:'80%',wordWrap:'break-word'}}>{msg.message}</span>
            </li>
            ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handle}
        style={{width:'80%',borderRadius:'56px',border:'2px solid black'}}/>
        <img src={send} onClick={handleSendMessage} style={{width:'40px'}}></img>
      </div>
    </div>
        
         
    </Container>
        </div>
  );
          }; }
export default Chat