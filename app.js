const path = require('path')
const windowStateKeeper = require('electron-window-state');
const Store = require('electron-store');

const {
  electron,
  app,
  BrowserWindow,
  ipcMain,
  nativeTheme,
  Menu,
} = require('electron');

global.share= {electron, nativeTheme,ipcMain};

const store = new Store({
  userPrefrences: {
    firstStart: {
      type: 'boolen',
      default: true
    }
  },
  kamar: {
    key: {
      type: 'string'
    },
    username: {
      type: 'string',
      format: 'username'
    },
    password: {
      type: 'string',
      format: 'password'
    }
  }
});

function createWindow() {
  // Load the previous state with fallback to defaults
  let mainWindowState = windowStateKeeper({
    defaultWidth: 995,
    defaultHeight: 700
  });

  const win = new BrowserWindow({
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
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindowState.manage(win);

  win.loadFile('src/index.html');

  store.set('userPrefrences.firstStart', true);

  // This holds the window capitive until the assests have been loaded
  // that way keeping the window from flashing white after being created
  win.once('ready-to-show', () => {
    win.show();
  })
}

const isMac = process.platform === 'darwin'
const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [{
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'services'
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? {
        role: 'close'
      } : {
        role: 'quit'
      }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [{
        role: 'undo'
      },
      {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      ...(isMac ? [{
          role: 'pasteAndMatchStyle'
        },
        {
          role: 'delete'
        },
        {
          role: 'selectAll'
        },
        {
          type: 'separator'
        },
        {
          label: 'Speech',
          submenu: [{
              role: 'startSpeaking'
            },
            {
              role: 'stopSpeaking'
            }
          ]
        }
      ] : [{
          role: 'delete'
        },
        {
          type: 'separator'
        },
        {
          role: 'selectAll'
        }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [{
        role: 'resetZoom'
      },
      {
        role: 'zoomIn'
      },
      {
        role: 'zoomOut'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  // { role: 'timetableMenu' }
  {
    label: 'Timetable',
    submenu: [{
      role: 'reload'
    }]
  },
  // { role: 'timetableMenu' }
  {
    label: 'Dev Tools',
    submenu: [{
        role: 'reload'
      },
      {
        role: 'forceReload'
      },
      {
        role: 'toggleDevTools'
      },
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [{
        role: 'minimize'
      },
      {
        role: 'zoom'
      },
      ...(isMac ? [{
          type: 'separator'
        },
        {
          role: 'front'
        },
        {
          type: 'separator'
        },
        {
          role: 'window'
        }
      ] : [{
        role: 'close'
      }])
    ]
  },
  {
    role: 'help',
    submenu: [{
      label: 'Learn More',
      click: async () => {
        const {
          shell
        } = require('electron')
        await shell.openExternal('https://electronjs.org')
      }
    }]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.setAboutPanelOptions({
  applicationName: app.name,
  applicationVersion: "0.0.1",
  copyright: "Copyright 2020-2021 Maverick Software.",
  credits: "Jonathan Voss"
});

app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

require('./ipcHandler');