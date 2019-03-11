const Lightning = require("@wolfx/lightning");
const { findByAge } = require("../service/user");
const ResultJSON = require("../model/ResultJSON");

const { app } = Lightning.core.getState();

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/test", async (req, res) => {
  const result = await findByAge(18);
  const json = new ResultJSON();
  json.data = result;
  json.msg = "查询成功";
  json.success = true;
  res.send(json);
});
