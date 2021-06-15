const path = require('path'),
  windowStateKeeper = require('electron-window-state'),
  {
    electron,
    app,
    BrowserWindow,
    ipcMain,
    nativeTheme,
    Menu,
  } = require('electron');

global.share = {
  electron,
  nativeTheme,
  ipcMain
};

const Store = require('electron-store'),
  store = new Store({
    userPreferences: {
      authenticated: {
        type: 'boolean',
        default: false
      }
    },
    kamar: {
      credentials: {
        type: 'object'
      },
      username: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    }
  });

function createWindow() {
  // Load the previous state with fallback to defaults
  let mainWindowState = windowStateKeeper({
    defaultWidth: 995,
    defaultHeight: 700
  });

  const mainWindow = new BrowserWindow({
    'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height': mainWindowState.height,
    'minWidth': 995,
    'minHeight': 630,
    titleBarStyle: 'hiddenInset',
    vibrancy: 'sidebar',
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '/app/preload.js')
    }
  })

  mainWindow.loadURL(`file://${path.join(__dirname, '/app/src/index.html')}`);
  mainWindowState.manage(mainWindow);

  mainWindow.once('ready-to-show', () => mainWindow.show());
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  (process.platform !== 'darwin') ? app.quit(): console.log("Windows Closed")
})

app.on('activate', () => {
  (BrowserWindow.getAllWindows().length === 0) ? createWindow() : console.log("Opening existing window")
})

require('./app/ipcHandler');