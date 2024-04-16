import React from "react";
import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "../FileInput/FileInput";
import RatingInput from "../RatingInput/RatingInput";

const ReviewForm = () => {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
  });

  const handleChange = (name, value) => {
    // prevValues 파라미터 : 이전 State
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <input name="title" value={values.title} onChange={handleInputChange} />
      <RatingInput
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      {/* 데이터 전송을 위한 버튼 type : submit */}
      <button type="submit">확인</button>
    </form>
  );
};

export default ReviewForm;
