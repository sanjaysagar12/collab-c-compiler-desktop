const { app, BrowserWindow } = require("electron");
const path = require("path");
const child_process = require("child_process");

let win;
let serverProcess;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
    }
  });

  win.loadURL("http://localhost:3000");

  win.on("closed", () => {
    win = null;
    if (serverProcess) {
      serverProcess.kill();
    }
  });
}

app.whenReady().then(() => {
  // Start Express server
  serverProcess = child_process.spawn("node", [path.join(__dirname, "app.js")], {
    stdio: "inherit",
    shell: true
  });

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
