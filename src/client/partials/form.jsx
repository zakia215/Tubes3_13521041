import { useState } from 'react';
import '../css/style.css';
import axios from 'axios';
import PropTypes from 'prop-types';

MagicConchShellForm.propTypes = {
  setChatObject: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  kmp: PropTypes.bool.isRequired,
};

function MagicConchShellForm(props) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    // console.log("AAA")
    console.log(props.id);
    e.preventDefault();
    axios.patch(`http://localhost:3000/api/chat/${props.id}`, {
      question: inputText,
      kmp: props.kmp
    })
    .then((response) => {
      console.log("loo")
      props.setChatObject(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

    console.log(inputText);
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="form-container">
      <textarea
        placeholder="Ask the magic conch shell..."
        value={inputText}
        onChange={handleChange}
      />
      <img className="search" src="../public/shell.png" alt="Submit" onClick={handleSubmit} />
    </div>
);
}

export default MagicConchShellForm;
