const user = require("../service/user");
const logger = require("../utils/logger");
const ResultJSON = require("../model/ResultJSON");
const { get, post } = require("../utils/routerUtil");

get("/user/test", async (req, res) => {
  const json = new ResultJSON();
  try {
    json.data = await user.findByAge(18);
    json.msg = "查询成功";
    json.success = true;
  } catch (e) {
    json.msg = "查询失败";
    json.success = false;
    json.errorMsg = e.stack;
    logger.error(e.stack);
  }
  res.send(json);
});

post("/user/testPost", async (req, res) => {
  const json = new ResultJSON();
  try {
    json.data = req.body;
    json.msg = "查询成功";
    json.success = true;
  } catch (e) {
    json.msg = "查询失败";
    json.success = false;
    json.errorMsg = e.stack;
    logger.error(e.stack);
  }
  res.send(json);
});

get("/user/queryByParams", async (req, res) => {
  const json = new ResultJSON();
  try {
    json.data = await user.queryByParams(req.query);
    json.msg = "查询成功";
    json.success = true;
  } catch (e) {
    json.msg = "查询失败";
    json.success = false;
    json.errorMsg = e.stack;
    logger.error(e.stack);
  }
  res.send(json);
});
