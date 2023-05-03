// import React from 'react';

import SideBar from '../partials/SideBar';
import ChatSide from '../partials/ChatSide';
import { useState, useEffect } from 'react';
import '../css/style.css';
import axios from 'axios';

function Home() {

  const [kmp, setKmp] = useState(true);
  // const [chatObject, setChatObject] = useState(); 

  // useEffect(() => {
  //     axios.get('http://localhost:3000/api/chat')
  //         .then(response => {
  //             setChatObject(response.data);
  //             console.log(response.data);
  //         })
  //         .catch(error => {
  //             console.log(error);
  //         });
  // }, []);

  return (
    <div className="screen-wrapper">
      <SideBar setKmp = {setKmp}/>
      
      <ChatSide kmp = {kmp}/>
    </div>
  );
}

export default Home;