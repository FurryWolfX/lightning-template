const { post } = require("../utils/router");
const Lightning = require("@wolfx/lightning");
const { upload } = Lightning.core.getState();
// single 文件上传
post("/upload", upload.single("file"), (req, res, next) => {
  // console.log("file:" + req.file.originalname);
  // console.log(res);
  // const url = "http://" + req.headers.host + "/upload/" + req.file.filename;
  res.end(req.file.filename);
});
