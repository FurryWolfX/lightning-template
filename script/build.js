const spawn = require("child_process").spawn;

spawn("npm", ["run", "build"], {
  stdio: "inherit"
});
