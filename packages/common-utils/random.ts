/**
 * 在指定范围内生成随机数
 */
export const random = (start: number, stop: number): number => {
  return Math.floor(Math.random() * (stop - start) + start);
};
