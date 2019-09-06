const spawn = require("child_process").spawn;

spawn("npm", ["run", "dev"], {
  stdio: "inherit"
});
