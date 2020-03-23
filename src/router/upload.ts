import Lightning from "@wolfx/lightning";

const { app, upload } = Lightning.core.getState();

// single 文件上传
// 由于方法比较特殊，直接用 app 中的 post，不会被全局拦截
app.post("/upload", upload.single("file"), (req, res) => {
  // console.log("file:" + req.file.originalname);
  // console.log(res);
  // const url = "http://" + req.headers.host + "/upload/" + req.file.filename;
  res.end(req.file.filename);
});
