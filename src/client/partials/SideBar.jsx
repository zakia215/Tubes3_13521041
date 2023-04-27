import '../css/style.css';
import '../css/radioButton.css';
import History from './History';
import { useState } from 'react';

function SideBar() {
  const [algorithm, setAlgorithm] = useState('KMP');

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  return (
    <div className="sidebar-container">
      <History />
        
      
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

        
      <div className="new-chat-container">
        {/* + new chat */}
        <button className="new-chat-button"> + New Chat</button>

      </div>

    </div>
  );
}

export default SideBar;