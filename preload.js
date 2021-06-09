const {
  contextBridge,
  ipcRenderer
} = require('electron')

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})

contextBridge.exposeInMainWorld('requests', {
  login: (username, password) => ipcRenderer.invoke('login', username, password),
  timetable: () => ipcRenderer.invoke('timetable')
})