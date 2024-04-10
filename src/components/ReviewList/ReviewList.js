import "./ReviewList.css";

const formatDate = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
};

const ReviewListItem = (props) => {
  const { item, onDelete } = props;

  const handleDeleteClick = () => onDelete(item.id);

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt="item.title" />
      <div>
        <h1>{item.title}</h1>
        <p>{item.rating}</p>
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </div>
  );
};

const ReviewList = (props) => {
  const { items, onDelete } = props;
  return (
    <>
      <ul>
        {items.map((item) => {
          return (
            <li>
              <ReviewListItem item={item} onDelete={onDelete} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ReviewList;
