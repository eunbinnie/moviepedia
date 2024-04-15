import React from "react";
import { useState } from "react";
import "./ReviewForm.css";

const ReviewForm = () => {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // prevValues 파라미터 : 이전 State
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange} />
      <input
        type="number"
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />
      <textarea name="content" value={values.content} onChange={handleChange} />
      {/* 데이터 전송을 위한 버튼 type : submit */}
      <button type="submit">확인</button>
    </form>
  );
};

export default ReviewForm;
