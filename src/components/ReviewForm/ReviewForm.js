import React from "react";
import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "../FileInput/FileInput";
import RatingInput from "../RatingInput/RatingInput";
import useAsync from "../../hooks/useAsync";
import useTranslate from "../../hooks/useTranslate";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

const ReviewForm = ({
  initialValues = INITIAL_VALUES,
  initialPreview,
  onSubmitSuccess,
  onCancel,
  onSubmit,
}) => {
  const t = useTranslate();
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);

    let result = await onSubmitAsync(formData);
    if (!result) return;

    const { review } = result;
    setValues(INITIAL_VALUES);
    onSubmitSuccess(review);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        initialPreview={initialPreview}
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
      {onCancel && <button onClick={onCancel}>{t("cancel button")}</button>}
      <button type="submit" disabled={isSubmitting}>
        {t("confirm button")}
      </button>
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
};

export default ReviewForm;
