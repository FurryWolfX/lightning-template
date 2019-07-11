const Lightning = require("@wolfx/lightning");
const user = require("../service/user");
const logger = require("../utils/logger");
const ResultJSON = require("../model/ResultJSON");

const { app } = Lightning.core.getState();

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/test", async (req, res) => {
  const json = new ResultJSON();
  try {
    json.data = await user.findByAge(18);
    json.msg = "查询成功";
    json.success = true;
  } catch (e) {
    json.data = null;
    json.msg = "查询失败";
    json.success = false;
    logger.error(e.stack);
  }
  res.send(json);
});

app.get("/queryByParams", async (req, res) => {
  const json = new ResultJSON();
  try {
    json.data = await user.queryByParams(req.query);
    json.msg = "查询成功";
    json.success = true;
  } catch (e) {
    json.data = null;
    json.msg = "查询失败";
    json.success = false;
    logger.error(e.stack);
  }
  res.send(json);
});
