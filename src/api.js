/**
 * 리퀘스트 함수들을 모아놓는 함수
 */
export const getReviews = async (order = "createdAt") => {
  const query = `order=${order}`;
  const response = await fetch(
    `https://learn.codeit.kr/9516/film-reviews?${query}`
  );
  const body = response.json();
  return body;
};
