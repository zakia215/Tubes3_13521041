// import React from 'react';

import SideBar from '../partials/SideBar';
import ChatSide from '../partials/ChatSide';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/style.css';

function Home() {
  const [kmp, setKmp] = useState(true);
  const { chatId } = useParams();

  return (
    <div className="screen-wrapper">
      <SideBar setKmp = {setKmp}/>
      
      <ChatSide kmp = {kmp} chatId={chatId}/>
    </div>
  );
}

export default Home;