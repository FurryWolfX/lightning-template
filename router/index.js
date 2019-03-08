import Lightning from "@wolfx/lightning";
import { findByAge } from "../service/user";

const app = Lightning.core.getState().app;

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/test", async (req, res) => {
  res.send(await findByAge());
});
