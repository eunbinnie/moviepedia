import { useState } from "react";
import Rating from "../Rating/Rating";
import "./ReviewList.css";
import ReviewForm from "../ReviewForm/ReviewForm";

const formatDate = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
};

const ReviewListItem = (props) => {
  const { item, onDelete, onEdit } = props;

  const handleDeleteClick = () => onDelete(item.id);
  const handleEditClick = () => onEdit(item.id);

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt="item.title" />
      <div>
        <h1>{item.title}</h1>
        <Rating value={item.rating} />
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleDeleteClick}>삭제</button>
        <button onClick={handleEditClick}>수정</button>
      </div>
    </div>
  );
};

const ReviewList = (props) => {
  const { items, onDelete } = props;
  const [editingId, setEditingId] = useState(null); // 현재 수정 중인 요소의 id를 저장

  const handleCancel = () => setEditingId(null);

  return (
    <>
      <ul>
        {items.map((item) => {
          if (item.id === editingId) {
            const { imgUrl, title, rating, content } = item;
            const initialValues = { title, rating, content };
            return (
              <li key={item.id}>
                {/* input 요소로 재렌더링 */}
                <ReviewForm
                  initialValues={initialValues}
                  initialPreview={imgUrl}
                  onCancel={handleCancel}
                />
              </li>
            );
          }
          return (
            <li key={item.id}>
              <ReviewListItem
                item={item}
                onDelete={onDelete}
                onEdit={setEditingId}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ReviewList;
