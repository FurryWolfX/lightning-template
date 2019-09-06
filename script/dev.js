const spawn = require("child_process").spawn;

const npm = process.platform === "win32" ? "npm.cmd" : "npm";

spawn(npm, ["run", "dev"], {
  stdio: "inherit"
});
