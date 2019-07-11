const user = require("../service/user");
const ResultJSON = require("../model/ResultJSON");
const { get, post } = require("../utils/routerUtil");

get("/user/test", async (req, res) => {
  const json = new ResultJSON();
  json.data = await user.findByAge(18);
  json.msg = "查询成功";
  json.success = true;
  res.send(json);
});

post("/user/testPost", async (req, res) => {
  const json = new ResultJSON();
  json.data = req.body;
  json.msg = "查询成功";
  json.success = true;
  res.send(json);
});

get("/user/queryByParams", async (req, res) => {
  const json = new ResultJSON();
  json.data = await user.queryByParams(req.query);
  json.msg = "查询成功";
  json.success = true;
  res.send(json);
});
