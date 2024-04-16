import React, { useEffect, useRef, useState } from "react";

const FileInput = ({ name, value, initialPreview, onChange }) => {
  const [preview, setPreview] = useState(initialPreview);

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

  // value 값이 바뀔 때마다 preview 값 변경
  useEffect(() => {
    // value 값이 없는 경우에는 useEffect 콜백 함수 종료
    if (!value) return;

    // 문자열을 return, 해당 파일의 주소처럼 쓸 수 있는 값
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(initialPreview); // preview State를 초기화
      URL.revokeObjectURL(nextPreview); // 앞에서 만든 ObjectURL 해제
    };
  }, [value, initialPreview]);

  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />
      {/* value값이 있을 때만 나타남 */}
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
};

export default FileInput;
