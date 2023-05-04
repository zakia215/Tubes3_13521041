import React from 'react';
import {
  Routes,
  Route,
  // useLocation
} from 'react-router-dom';

import Home from '../pages/Home';
// import Chat from './pages/Chat';

function App() {

  return (
    <>
      <Routes>
        <Route exact path="/c/:chatId?" element={<Home />} />
        {/* <Route path="/c/:chatId" element={<Chat />} /> */}
        {/* <Route path="/signin" element={<SignIn />} /> */}
      </Routes>
    </>
  )
}

export default App
