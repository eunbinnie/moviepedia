import React from "react";
import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

// 별 하나를 보여주는 컴포넌트
const Star = ({ selected = false, rating, onSelect, onHover }) => {
  // selected 클래스 추가해서 style 다르게 보여주기
  const className = `Rating-star ${selected ? "selected" : ""}`;
  // onSelect 값이 있을 때만 지정
  const handleClick = onSelect ? () => onSelect(rating) : undefined;
  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      ★
    </span>
  );
};

// 별 다섯 개를 보여주는 컴포넌트
const Rating = ({ className, value = 0, onSelect, onHover, onMouseOut }) => {
  // value 값에 따라서 선택된(selected) 별의 개수를 다르게 보여줌
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {RATINGS.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating}
          rating={rating}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
};

export default Rating;
