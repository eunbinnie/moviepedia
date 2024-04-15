import React, { useRef } from "react";

const FileInput = ({ name, value, onChange }) => {
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} ref={inputRef} />
      {/* value값이 있을 때만 나타남 */}
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
};

export default FileInput;
