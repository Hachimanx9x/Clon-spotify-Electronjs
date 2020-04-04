const {app, BrowserWindow} = require('electron'); 

let main = null;

app.on('ready',()=>{
    main = new BrowserWindow({
        webPreferences:{ nodeIntegration: true}
    });
    main.loadFile(__dirname + '/index.html');
});