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
  const treeArr: any[] = [];
  treeData.forEach((node: Record<string, any>) => {
    if (node[options.pidName] === parentId) {
      const newNode = node;
      newNode.children = flatToTree(treeData, node[options.idName], options);
      treeArr.push(newNode);
    }
  });
  return treeArr;
};
