import * as fs from "fs";

type FileItem = {
  path?: string;
  filename?: string;
  url?: string;
};

export function readFileList(path: string, filesList = []): FileItem[] {
  const files = fs.readdirSync(path);
  files.forEach((itm, index) => {
    const stat = fs.statSync(path + "/" + itm);
    if (stat.isDirectory()) {
      //递归读取文件
      readFileList(path + "/" + itm, filesList);
    } else {
      const obj: FileItem = {}; //定义一个对象存放文件的路径和名字
      obj.path = path; //路径
      obj.filename = itm; //名字
      obj.url = path + "/" + itm;
      filesList.push(obj);
    }
  });
  return filesList;
}
