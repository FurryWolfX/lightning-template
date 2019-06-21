const Lightning = require("@wolfx/lightning");
const path = require("path");

Lightning.setConfig({
  websocket: false,
  cors: {
    allowedOrigins: ["*"]
  },
  requestLogCallback: (method, url) => {
    console.log(`[R] ${method} ${url}`);
  },
  responseLogCallback: (method, url, time) => {
    console.log(`[S] ${method} ${url} ${time}ms`);
  },
  storage: path.resolve(__dirname, "./public/upload"),
  routerDir: path.resolve(__dirname, "./router")
});
Lightning.core.start(3001);
