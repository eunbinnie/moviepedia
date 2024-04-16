/**
 * App 컴포넌트 : 최상위 컴포넌트
 */
import { useEffect, useState } from "react";
import ReviewForm from "./components/ReviewForm/ReviewForm";
import ReviewList from "./components/ReviewList/ReviewList";
import { getReviews } from "./api";

const LIMIT = 6;

const App = () => {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt"); // 정렬 기본 기준 : 최신순
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  // 현재 네트워크가 request 중이면 true, 아니면 false
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

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
  const handleLoad = async (options) => {
    let result;

    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getReviews(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }

    const { reviews, paging } = result;
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  // 다음 페이지를 불러올 함수
  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleSubmitSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewForm onSubmitSuccess={handleSubmitSuccess} />
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
};

export default App;
