/**
 * 리퀘스트 함수들을 모아놓는 함수
 */
export const getReviews = async ({
  order = "createdAt",
  offset = 0, // 지금까지 받아온 데이터 개수
  limit = 6, // 받아올 데이터 개수
}) => {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(
    `https://learn.codeit.kr/9516/film-reviews?${query}`
  );
  if (!response.ok) {
    throw new Error("리뷰를 불러오는데 실패했습니다");
  }
  const body = response.json();
  return body;
};
