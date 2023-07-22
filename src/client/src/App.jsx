import {
  Routes,
  Route,
} from 'react-router-dom';

import Home from '../pages/Home';

function App() {

  return (
    <>
      <Routes>
        {/* <Route exact path="/c/:chatId?" element={<Home />} /> */}
        <Route exact path="/" element={<Home />} />
        <Route path="/c/:chatId?" element={ <Home />} />
      </Routes>
    </>
  )
}

export default App
