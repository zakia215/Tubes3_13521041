import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function MagicConchShellForm(props) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // props.chatList.push
    // do something with the question input
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Ask the magic conch shell...
        <input
          type="text"
          placeholder="Ask the magic conch shell..."
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
      </label>
      <button type="submit">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
}

export default MagicConchShellForm;
