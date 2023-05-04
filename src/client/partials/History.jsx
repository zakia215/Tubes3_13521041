import '../css/style.css';
import '../css/history.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const handleDelete = (id) => {
    console.log("delete");
    console.log(id);
    axios.delete(`http://localhost:3000/api/chat/${id}`)
    .then(response => {
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

  const [editMode, setEditMode] = useState({});
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    setInputValues(props.chatNameList.reduce((acc, chat) => {
      acc[chat.id] = chat.name;
      return acc;
    }, {}));
  }, [props.chatNameList]);
  
  const handleEdit = (id) => {
    setEditMode({ ...editMode, [id]: true });
    setInputValues({ ...inputValues, [id]: props.chatNameList.find(chat => chat.id === id).name });
  };

  const handleCancel = (id) => {
    setEditMode({ ...editMode, [id]: false });
    setInputValues({ ...inputValues, [id]: props.chatNameList.find(chat => chat.id === id).name });
  };

  const handleClick = (id) => {
    navigate(`/c/${id}`);
    console.log("change id", id);
  };

  const handleSave = (id) => {
    if (!inputValues[id]) {
      alert('Please enter a name');
      return;
    }
  
    axios.patch(`http://localhost:3000/api/chat/${id}`, { name: inputValues[id] })
      .then(response => {
        const updatedChatNameList = props.chatNameList.map(chat => chat.id === id ? { ...chat, name: inputValues[id] } : chat);
        props.setChatNameList(updatedChatNameList);
        setEditMode({ ...editMode, [id]: false });
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const handleInputChange = (id, value) => {
    setInputValues({ ...inputValues, [id]: value });
  };

  let historyNameList = props.chatNameList.map(chatTuple => {
    const isEditMode = editMode[chatTuple.id];
    const inputValue = inputValues[chatTuple.id];

    return (
      <div className="history-item-container" key={chatTuple.id}>
        <div className="history-item" onClick={() => handleClick(chatTuple.id)}>
          <div className="history-name-container">
            <input
              className="history-name"
              type="text"
              value={inputValue}
              onChange={(event) => handleInputChange(chatTuple.id, event.target.value)}
              disabled={!isEditMode}
              style={isEditMode ? {border: '1px solid #fff', backgroundColor: '#9271A1'} : {}}
            />
          </div>
          {isEditMode ? (
              <img
                className="history-button"
                src="/checkmark.png"
                alt="Save"
                onClick={() => handleSave(chatTuple.id)}
              />  
            ) : (
              <img
                className="history-button"
                src="/edit.png"
                alt="Edit"
                onClick={() => handleEdit(chatTuple.id)}
              />  
          )}

          {isEditMode ? (
              <img
              className="history-button"
              src="/close.png"
              alt="Cancel"
              onClick={() => handleCancel(chatTuple.id)}
              />
              ) : (
              <img
                className="history-button"
                src="/trash.png"
                alt="Delete"
                onClick={() => handleDelete(chatTuple.id)}
              />
          )}
        </div>
      </div>
    );
  });

  historyNameList = [...historyNameList].reverse();

  return (
    <div className="chat-history-container">
      <div className="history-container-wrapper">
        <div className="history-container">
          { historyNameList }
        </div>
      </div>
    </div>
  );
}

export default History;