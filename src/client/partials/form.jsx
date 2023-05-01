import { useState } from 'react';
import '../css/style.css';

function MagicConchShellForm() {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
