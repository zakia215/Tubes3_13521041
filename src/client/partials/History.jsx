import '../css/style.css';
import '../css/history.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

History.propTypes = {
  setChatsObject: PropTypes.func.isRequired,
  setChatNameList: PropTypes.func.isRequired,
  chatNameList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
};

function History(props) {
  // fetch to api/chat
  // const [chatsObject, setChatsObject] = useState([]); 
  // const [chatNameList, setChatNameList] = useState([]); 
  // const [historyNameList, setHistoryNameList] = useState([]); 

  const handleDelete = (id) => {
    console.log("delete");
    console.log(id);
    axios.delete(`http://localhost:3000/api/chat/${id}`)
    .then(response => {
      // props.setChatsObject(response.data);
      console.log(response);
      const updatedChatNameList = props.chatNameList.filter(
        (chat) => chat.id !== id
      );
      props.setChatNameList(updatedChatNameList);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const handleEdit = (id) => {
    console.log("edit");
    console.log(id);
    // setIsLoading(true);
    // axios.post('http://localhost:3000/api/chat', {
    //   name: 'New Chat'
    // })
    // .then(response => {
    //   setChatsObject(response.data);
    //   console.log(response);
    //   setIsLoading(false);
    // })
    // .catch(error => {
    //   console.log(error);
    //   setIsLoading(false);
    // });
  }

  let historyNameList = [];

  props.chatNameList.map((chatTuple, index) => {
    historyNameList.push(
      <div className="history-item-container" key={index}>
        <div className="history-item">
          <div className="history-name-container">
            {chatTuple.name}
          </div>
          <img className="history-button" src="../public/edit.png" alt="Submit" onClick={() => handleEdit(chatTuple.id)} />
          <img className="history-button" src="../public/trash.png" alt="Submit" onClick={() => handleDelete(chatTuple.id)} />

        </div>
      </div>
    )
  });

  // let historyNameList = props.chatNameList;
  // let historyNameList = ["Chat 1","Chat 2","Chat 3","Chat 4","Chat 5","Chat 6","Chat 7","Chat 8","Chat 9"];
  // let historyNameList = ["Chat 1","Chat 2","Chat 3"];
  return (
    <div className="chat-history-container">
      {/* <div className="history-title">History</div> */}
      <div className="history-container-wrapper">
          <div className="history-container">
            {
              historyNameList
              // historyNameList.map((historyName, index) => (
              //   props.chatNameList.map((historyName, index) => (
              //   <div className="history-item" key={index}>
              //     {historyName}
              //     {/* <img className="history-button" src="../public/shell.png" alt="Submit" onClick={handleEdit} /> */}
              //     {/* <img className="history-button" src="../public/shell.png" alt="Submit" onClick={handleDelete} /> */}

              //   </div>
              // ))
            }

          </div>
      </div>
    </div>
  );
}

export default History;