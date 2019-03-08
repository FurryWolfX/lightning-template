require("babel-register")({
  presets: ["env", "flow"],
  plugins: ["syntax-async-functions", "transform-regenerator", "babel-polyfill"]
});

const Lightning = require("@wolfx/lightning");
const path = require("path");

Lightning.core.setConfig({
  database: {
    debug: true,
    dialect: "mysql",
    host: "192.168.1.22",
    port: 3306,
    database: "test",
    user: "root",
    password: "junlian",
    pool: {
      minSize: 5,
      maxSize: 20,
      connectionLimit: 5
    }
  },
  cors: {
    allowedOrigins: ["*"]
  },
  storage: path.resolve(__dirname, "./public/upload"),
  yaml: path.resolve(__dirname, "./yaml"),
  routerDir: path.resolve(__dirname, "./router")
});
Lightning.core.start(3001);
