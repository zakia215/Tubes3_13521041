
import '../css/style.css';
import '../css/chatSide.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
import MagicConchShellForm from './form'
// import react from 'react';

function ChatSide() {
  // fetch to api/chat
  const [chatObject, setChatObject] = useState([]); 
  const [chatQuestionList, setChatQuestionList] = useState([]); 

  useEffect(() => {
      axios.get('http://localhost:3000/api/chat/64486d07e362312840415477')
          .then(response => {
              setChatObject(response.data);
              console.log(response.data);
          })
          .catch(error => {
              console.log(error);
          });
  }, []);

  useEffect(() => {
      if (chatObject.chat) {
        setChatQuestionList(chatObject.chat.questionList.map((q) => {
            return [q.question, q.answer];
          }).flat()
        );
      }
  }, [chatObject]);
    
  let chatList = chatQuestionList;

  // let chatList = ["Chat 1","Chat 2","Chat 3","Chat 4","Chat 5","Chat 6","Chat 7","Chat 8","Chat 9"];
  // let chatList = ["Chat 1","Chat 2","Chat 3"];

  // historyNameList.map((historyName, index) => (
  //   <div className="history-item" key={index}>
  //       {historyName}
  //   </div>
  // ))

  let chatItemList = [];

  chatList.map((chat, index) => {
    chatItemList.push(
      <div className="chat-item" key={index}>
        <div className="profile-picture"> 
          <img 
              src="../public/shell.png" 
              alt="magic conch shell" 
              style={{visibility: index % 2 === 1 ? 'visible' : 'hidden' }} 
            />
        </div>
        <div className="chat-content">
          {chat}
        </div>
        <div className="profile-picture"> 
          <img 
            src="../public/shell.png" 
            alt="magic conch shell" 
            style={{visibility: index % 2 === 1 ? 'hidden' : 'visible' }} 
          />
        </div>
      </div>
    )
  })
  return (
    <div className="chat-side-container">
      <div className="chat-container">

        {chatItemList}

      </div>
      <div className="chat-form-container">
        < MagicConchShellForm />
      </div>
    </div>
  );
}

export default ChatSide;