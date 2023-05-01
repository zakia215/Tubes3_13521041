import '../css/style.css';
import '../css/history.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function History() {
  // fetch to api/chat
  const [chatObject, setChatObject] = useState([]); 
  const [chatNameList, setChatNameList] = useState([]); 

  useEffect(() => {
    axios.get('http://localhost:3000/api/chat')
        .then(response => {
            setChatObject(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
  }, []);

  useEffect(() => {
    if (chatObject.chats) {
      setChatNameList(chatObject.chats.map(chat => chat.name));
    }
  }, [chatObject]);
    
  let historyNameList = chatNameList;
  // let historyNameList = ["Chat 1","Chat 2","Chat 3","Chat 4","Chat 5","Chat 6","Chat 7","Chat 8","Chat 9"];
  // let historyNameList = ["Chat 1","Chat 2","Chat 3"];
  return (
    <div className="chat-history-container">
      {/* <div className="history-title">History</div> */}
      <div className="history-container-wrapper">
          <div className="history-container">
            {
              historyNameList.map((historyName, index) => (
                <div className="history-item" key={index}>
                  {historyName}
                </div>
              ))
            }
          </div>
      </div>
    </div>
  );
}

export default History;