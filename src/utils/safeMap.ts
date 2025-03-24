/**
 * 안전하게 배열의 map 메서드를 사용하기 위한 유틸리티 함수
 * undefined, null 또는 배열이 아닌 값이 전달되어도 오류가 발생하지 않음
 */
export function safeMap<T, U>(
  array: T[] | null | undefined,
  callback: (item: T, index: number, array: T[]) => U
): U[] {
  if (!array || !Array.isArray(array)) {
    return [];
  }
  return array.map(callback);
}
