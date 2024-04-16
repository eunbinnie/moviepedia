const BASE_URL = "https://learn.codeit.kr/9516";
/**
 * 리퀘스트 함수들을 모아놓는 함수
 */
export const getReviews = async ({
  order = "createdAt",
  offset = 0, // 지금까지 받아온 데이터 개수
  limit = 6, // 받아올 데이터 개수
}) => {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(`${BASE_URL}/film-reviews?${query}`);
  if (!response.ok) {
    throw new Error("리뷰를 불러오는데 실패했습니다");
  }
  const body = response.json();
  return body;
};

export const createReview = async (formData) => {
  const response = await fetch(`${BASE_URL}/film-reviews`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("리뷰를 생성하는데 실패했습니다");
  }
  const body = response.json();
  return body;
};

export const updateReview = async (id, formData) => {
  const response = await fetch(`${BASE_URL}/film-reviews/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("리뷰를 수정하는데 실패했습니다");
  }
  const body = response.json();
  return body;
};
