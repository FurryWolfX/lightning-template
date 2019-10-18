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

/**
 * 扁平数据转树
 */
type FlatToTreeOption = {
  idName: string;
  pidName: string;
};
export const flatToTree = (
  treeData: any,
  parentId: any,
  options: FlatToTreeOption = {
    idName: "id",
    pidName: "parentId"
  }
): any[] => {
  const treeArr = [];
  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i];
    if (node[options.pidName] === parentId) {
      const newNode = node;
      newNode.children = flatToTree(treeData, node[options.idName], options);
      treeArr.push(newNode);
    }
  }
  return treeArr;
};
