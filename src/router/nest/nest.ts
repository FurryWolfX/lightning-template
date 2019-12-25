import { get } from "../../utils/router";

get("/nest", (req, res) => res.send("嵌套的路由也可以被识别到哦!"));
