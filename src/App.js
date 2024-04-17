/**
 * App 컴포넌트 : 최상위 컴포넌트
 */
import { useCallback, useEffect, useState } from "react";
import ReviewForm from "./components/ReviewForm/ReviewForm";
import ReviewList from "./components/ReviewList/ReviewList";
import { createReview, getReviews, updateReview } from "./api";
import useAsync from "./hooks/useAsync";
import { LocaleProvider } from "./contexts/LocaleContext";
import LocaleSelect from "./components/LocaleSelect/LocaleSelect";

const LIMIT = 6;

const App = () => {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt"); // 정렬 기본 기준 : 최신순
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);

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
  const handleLoad = useCallback(
    async (options) => {
      let result = await getReviewsAsync(options);
      if (!result) return;

      const { reviews, paging } = result;
      if (options.offset === 0) {
        setItems(reviews);
      } else {
        setItems((prevItems) => [...prevItems, ...reviews]);
      }
      setOffset(options.offset + reviews.length);
      setHasNext(paging.hasNext);
    },
    [getReviewsAsync]
  );

  // 다음 페이지를 불러올 함수
  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  // 수정한 내용 반영
  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order, handleLoad]);

  return (
    <LocaleProvider defaultValue={"ko"}>
      <div>
        <LocaleSelect />
        <div>
          <button onClick={handleNewestClick}>최신순</button>
          <button onClick={handleBestClick}>베스트순</button>
        </div>
        <ReviewForm
          onSubmit={createReview}
          onSubmitSuccess={handleCreateSuccess}
        />
        <ReviewList
          items={sortedItems}
          onDelete={handleDelete}
          onUpdate={updateReview}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {hasNext && (
          <button disabled={isLoading} onClick={handleLoadMore}>
            더 보기
          </button>
        )}
        {loadingError?.message && <span>{loadingError.message}</span>}
      </div>
    </LocaleProvider>
  );
};

export default App;
