import '../css/style.css';
import '../css/radioButton.css';
import History from './History';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

SideBar.propTypes = {
  setKmp: PropTypes.func.isRequired,
};

function SideBar(props) {
  const [algorithm, setAlgorithm] = useState('KMP');
  const [chatsObject, setChatsObject] = useState([]); 
  const [chatNameList, setChatNameList] = useState([]); 
  const navigate = useNavigate();

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
    event.target.value == "KMP" ? props.setKmp(true) : props.setKmp(false);
  };

  const handleNewChatClick = () => {
    axios.post('https://tubes313521041-production.up.railway.app/api/chat', {
      name: 'New Chat'
    })
    .then(response => {      setChatsObject(response.data);
      console.log(response);
      setChatNameList(prevState => [...prevState, {id: response.data.chat._id, name: response.data.chat.name}]);
      navigate(`/c/${response.data.chat._id}`);
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  useEffect(() => {
    axios.get('https://tubes313521041-production.up.railway.app/api/chat')
        .then(response => {
            setChatsObject(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
  }, []);

  useEffect(() => {
    if (chatsObject.chats) {
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