/**
 * App 컴포넌트 : 최상위 컴포넌트
 */
import { useEffect, useState } from "react";
import ReviewList from "./components/ReviewList/ReviewList";
import { getReviews } from "./api";

const App = () => {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt"); // 정렬 기본 기준 : 최신순
  const sortedItems = items.sort((a, b) => b[order] - a[order]); // 베스트순 정렬

  // 클릭한 기준으로 정렬 변경하는 함수
  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  // 아이템 삭제
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  // 영화 리스트 렌더링
  const handleLoad = async (orderQuery) => {
    const { reviews } = await getReviews(orderQuery);
    setItems(reviews);
  };

  useEffect(() => {
    handleLoad(order);
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
};

export default App;
