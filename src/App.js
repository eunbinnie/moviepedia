/**
 * App 컴포넌트 : 최상위 컴포넌트
 */
import ReviewList from "./components/ReviewList/ReviewList";
import items from "./mock.json";

const App = () => {
  return (
    <>
      <ReviewList items={items} />
    </>
  );
};

export default App;
