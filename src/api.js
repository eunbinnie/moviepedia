/**
 * 리퀘스트 함수들을 모아놓는 함수
 */
export const getReviews = async () => {
  const response = await fetch("https://learn.codeit.kr/9516/film-reviews");
  const body = await response.json();
  return body;
};
