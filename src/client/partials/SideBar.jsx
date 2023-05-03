import '../css/style.css';
import '../css/radioButton.css';
import History from './History';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

SideBar.propTypes = {
  setKmp: PropTypes.func.isRequired,
};

function SideBar(props) {
  const [algorithm, setAlgorithm] = useState('KMP');
  const [isLoading, setIsLoading] = useState(false); // tambahkan state untuk menunjukkan apakah permintaan GET sedang berlangsung
  const [chatsObject, setChatsObject] = useState([]); 
  const [chatNameList, setChatNameList] = useState([]); 

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
    event.target.value == "KMP" ? props.setKmp(true) : props.setKmp(false);
  };

  const handleNewChatClick = () => {
    console.log("ooo");
    setIsLoading(true);
    axios.post('http://localhost:3000/api/chat', {
      name: 'New Chat'
    })
    .then(response => {
      setChatsObject(response.data);
      console.log(response);
      setIsLoading(false);
      // setChatNameList(response.data.chat.push(chat => ({id: chat._id, name: chat.name})));
      setChatNameList(prevState => [...prevState, {id: response.data.chat._id, name: response.data.chat.name}]);
    })
    .catch(error => {
      console.log(error);
      setIsLoading(false);
    });
  }
  
  useEffect(() => {
    axios.get('http://localhost:3000/api/chat')
        .then(response => {
            setChatsObject(response.data);
            console.log("ppp");
            console.log(response.data);
            // setChatNameList(chatsObject.chats.map(chat => chat.name));
            // setChatNameList(chatsObject.chats.map(chat => ({id: chat._id, name: chat.name})));
        })
        .catch(error => {
            console.log(error);
        });
  }, []);

  useEffect(() => {
    if (chatsObject.chats) {
      // setChatNameList(chatsObject.chats.map(chat => chat.name));
      setChatNameList(chatsObject.chats.map(chat => ({id: chat._id, name: chat.name})));
    }
  }, [chatsObject]);

  return (
    <div className="sidebar-container">
      <div className="new-chat-container">
        <button className="new-chat-button" onClick={handleNewChatClick}>+ New Chat</button>
      </div>

      <History chatNameList={chatNameList} setChatNameList={setChatNameList} setChatsObject={setChatsObject} />

      <div className="selected-algorithm-container">
        <div id="selected-algorithm">Selected Algorithm</div>

        <div>
          <div className="radio-button-item">
            <label className="radio">
              <input
                className='radio__input'
                type="radio"
                value="KMP"
                checked={algorithm === 'KMP'}
                onChange={handleAlgorithmChange}
              />
              <div className="radio__radio"></div>
              
              <span className="label">Knuth-Morris-Pratt (KMP)</span>
            </label>

          </div>
          <div className="radio-button-item">
            <label className="radio">
              <input
                className='radio__input'
                type="radio"
                value="BM"
                checked={algorithm === 'BM'}
                onChange={handleAlgorithmChange}
              />
              <div className="radio__radio"></div>
              
              <span className="label">Boyer-Moore (BM)</span>
            </label>
          </div>

        </div>
      </div>

    </div>
  );
}

export default SideBar;