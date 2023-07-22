
import '../css/style.css';
import '../css/chatSide.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import MagicConchShellForm from './form'
import PropTypes from 'prop-types'
import React from 'react'

ChatSide.propTypes = {
  kmp: PropTypes.bool.isRequired,
  chatId: PropTypes.string,
};

function ChatSide(props) {
  // fetch to api/chat
  const [chatObject, setChatObject] = useState([]); 
  const [chatQuestionList, setChatQuestionList] = useState([]); 

  useEffect(() => {
    if (props.chatId) {
      axios.get(`https://conch-backend.vercel.app/api/chat/${props.chatId}`)
      .then(response => {
        setChatObject(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }, [props.chatId]);

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

  let chatItemList = [];

  chatList.map((chat, index) => {
    chatItemList.push(
      <div className="chat-item" key={index}>
        <div className="profile-picture"> 
          <img 
              src="/shell.png" 
              alt="magic conch shell" 
              style={{visibility: index % 2 === 1 ? 'visible' : 'hidden' }} 
            />
        </div>
        <div className="chat-content">
            {chat.split('\n').map((line, index) => {
              return <React.Fragment key={index}>{line}<br/></React.Fragment>;
            })}

        </div>
        <div className="profile-picture"> 
          <img 
            src="/person.png" 
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
      
      {props.chatId ?
        <div className="chat-form-container">
          < MagicConchShellForm 
            id={props.chatId}
            setChatObject={setChatObject}
            kmp = {props.kmp}
          />
        </div>
        :
        null
      }
    </div>
  );
}

export default ChatSide;