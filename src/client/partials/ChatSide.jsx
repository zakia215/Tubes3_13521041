
import '../css/style.css';
import '../css/chatSide.css';
import { useState } from 'react';
// import MagicConchShellForm from './form'
// import react from 'react';

function ChatSide() {
  // const { chatList, setChatList } = useState([]);

  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputText);
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  let chatList = ["Chat 1","Chat 2","Chat 3","Chat 4","Chat 5","Chat 6","Chat 7","Chat 8","Chat 9"];
  // let chatList = ["Chat 1","Chat 2","Chat 3"];

  // historyNameList.map((historyName, index) => (
  //   <div className="history-item" key={index}>
  //       {historyName}
  //   </div>
  // ))

  let chatItemList = [];

  chatList.map((chat, index) => {
    chatItemList.push(
      <div className="chat-item">
        <div className="profile-picture"> 
          <img 
              src="../public/shell.png" 
              alt="magic conch shell" 
              style={{visibility: index % 2 === 1 ? 'hidden' : 'visible' }} 
            />
        </div>
        <div className="chat-content">
          {chat}
        </div>
        <div className="profile-picture"> 
          <img 
            src="../public/shell.png" 
            alt="magic conch shell" 
            style={{visibility: index % 2 === 1 ? 'visible' : 'hidden' }} 
          />
        </div>
      </div>
    )
  })
  return (
    <div className="chat-side-container">
      <div className="chat-container">
        <div className="chat-item">
            <div>
              <img className="profile-picture" src="../public/shell.png" alt="magic conch shell" />
            </div>
            <div className="chat-content">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio reprehenderit fugiat suscipit labore ullam quaerat ex recusandae quod. Totam veniam tempora modi nesciunt nam eaque voluptate, perspiciatis dolores quae distinctio.
            </div>
            <div>
              <img className="profile-picture" src="../public/shell.png" alt="magic conch shell" />
            </div>
        </div>

        {chatItemList}

      </div>
      <div className="chat-form-container">

        <div className="form-container">
          <textarea
            placeholder="Ask the magic conch shell..."
            value={inputText}
            onChange={handleChange}
          />
          <img className="search" src="../public/shell.png" alt="Submit" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default ChatSide;