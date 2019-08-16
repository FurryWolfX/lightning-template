/**
 * 生成符合微软规范的GUID
 */
export const getGUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    // @ts-ignore
    return (c === "x" ? (Math.random() * 16) | 0 : "r&0x3" | "0x8").toString(16);
  });
};

/**
 * 在指定范围内生成随机数
 */
export const random = (start, stop): number => {
  return parseInt(Math.random() * (stop - start) + start);
};

/**
 * 异步等待
 */
export const sleep = (time: number): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });
};
