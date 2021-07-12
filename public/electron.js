const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  //size for window
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1000,
    resizable: false,

    fullscreen: false,

    title: "Clon de spotify (Musicfy)",

    titleBarStyle: "hiddenInset",
  });
  //load file
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) {
    //Open the Dev tools
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("closed", () => (mainWindow = null));
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
/**
 <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCMBWzyYpI1PMd93HI6HhJRmnn3Wy6d57k",
    authDomain: "clon-music-spotify.firebaseapp.com",
    projectId: "clon-music-spotify",
    storageBucket: "clon-music-spotify.appspot.com",
    messagingSenderId: "863150262812",
    appId: "1:863150262812:web:aeb521b5c7fc481ab1edd9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
 */
