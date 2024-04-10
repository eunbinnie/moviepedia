/**
 * App 컴포넌트 : 최상위 컴포넌트
 */
import { useState } from "react";
import ReviewList from "./components/ReviewList/ReviewList";
import items from "./mock.json";

const App = () => {
  const [order, setOrder] = useState("createdAt"); // 정렬 기본 기준 : 최신순
  const sortedItems = items.sort((a, b) => b[order] - a[order]); // 베스트순 정렬

  // 클릭한 기준으로 정렬 변경하는 함수
  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewList items={sortedItems} />
    </div>
  );
};

export default App;
