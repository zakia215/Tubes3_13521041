
import '../css/style.css';
import '../css/chatSide.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import MagicConchShellForm from './form'
import PropTypes from 'prop-types'

ChatSide.propTypes = {
  kmp: PropTypes.bool.isRequired,
};

function ChatSide(props) {
  // fetch to api/chat
  const [chatObject, setChatObject] = useState([]); 
  const [chatQuestionList, setChatQuestionList] = useState([]); 

  useEffect(() => {
    axios.get('http://localhost:3000/api/chat/64514a328eb52723406517d9')
      .then(response => {
        setChatObject(response.data);
        console.log("qqq");
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

  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current.scrollTop =
      chatContainerRef.current.scrollHeight -
      chatContainerRef.current.clientHeight;
  }, [chatList]);

  // let chatList = ["Chat 1","Chat 2","Chat 3","Chat 4","Chat 5","Chat 6","Chat 7","Chat 8","Chat 9"];
  // let chatList = ["Chat 1","Chat 2","Chat 3"];

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
            src="../public/person.png" 
            alt="magic conch shell" 
            style={{borderRadius: '5px', visibility: index % 2 === 1 ? 'hidden' : 'visible' }} 
          />
        </div>
      </div>
    )
  })

  return (
    <div className="chat-side-container">
      <div className="chat-container" ref={chatContainerRef}>
        {chatItemList}
      </div>
      
      <div className="chat-form-container">
        < MagicConchShellForm 
          id="64514a328eb52723406517d9"
          setChatObject={setChatObject}
          kmp = {props.kmp}
        />
      </div>
    </div>
  );
}

export default ChatSide;