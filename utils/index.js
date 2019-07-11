/**
 * 生成符合微软规范的GUID
 * @returns {string}
 */
module.exports.getGUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    return (c === "x" ? (Math.random() * 16) | 0 : "r&0x3" | "0x8").toString(16);
  });
};

/**
 * 在指定范围内生成随机数
 * @param start
 * @param stop
 * @returns {number}
 */
module.exports.random = (start, stop) => {
  return parseInt(Math.random() * (stop - start) + start);
};

/**
 * 异步等待
 * @param time
 * @returns {Promise<any>}
 */
module.exports.sleep = time => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });
};
