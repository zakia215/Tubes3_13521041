// import React from 'react';

import SideBar from '../partials/SideBar';
import ChatSide from '../partials/ChatSide';

import '../css/style.css';

function Home() {
  return (
    <div className="screen-wrapper">
      <SideBar />
      
      <ChatSide />
    </div>
  );
}

export default Home;