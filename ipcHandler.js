var axios = require('axios');
var qs = require('qs');
var parser = require('fast-xml-parser');
const Store = require('electron-store');
const store = new Store();

// Request the systems prefered Light / Dark theme and passes it to 
// render.js and index.html
global.share.ipcMain.handle('dark-mode:toggle', () => {
    if (global.share.nativeTheme.shouldUseDarkColors) {
        global.share.nativeTheme.themeSource = 'light'
    } else {
        global.share.nativeTheme.themeSource = 'dark'
    }
    return global.share.nativeTheme.shouldUseDarkColors
})

// Resets the app color theme to the system's prefered
global.share.ipcMain.handle('dark-mode:system', () => {
    global.share.nativeTheme.themeSouce = 'system'
})

// Handleds the kamar login process and returned true if sucsessful
global.share.ipcMain.handle('login', async (event, username, password) => {
    const response = await axios({
        method: 'post',
        url: 'https://portal.mahurangi.school.nz/kamar/api/api.php',
        data: qs.stringify({
            'Command': 'Logon',
            'Key': 'vtku',
            'Username': `${username}`,
            'Password': `${password}`
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Maverick Calender',
            'Origin': 'file://',
            'X-Requested-With': 'nz.co.KAMAR'
        }
    });

    const data = parser.parse(await response.data);

    switch (data.LogonResults.ErrorCode) {
        case 0:
            if (data.LogonResults.LogonLevel == 1) {
                console.log('Login Successful');
                store.set('kamar.key', data.LogonResults.Key);
                store.set('kamar.username', username);
                store.set('kamar.password', password);
                return true
            } else {
                console.log('Unknow Username or Password');
                return false
            }
            case 2:
                console.log('Missing Key');
                return false
            case 3:
                console.log('Invalid Key');
                return false
            case 4:
                console.log('Unknow Command');
                return false
            case 7:
                console.log('Command Disabled');
                return false
    }
})

// Handleds the kamar login process and returned true if sucsessful
global.share.ipcMain.handle('timetable', async (event) => {
    const response = await axios({
        method: 'post',
        url: 'https://portal.mahurangi.school.nz/kamar/api/api.php',
        data: qs.stringify({
            'Command': 'GetCalendar',
            'Key': `${store.get('kamar.key')}`,
            'Year': '2021'
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Maverick Calender',
            'Origin': 'file://',
            'X-Requested-With': 'nz.co.KAMAR'
        }
    });
    /*
    const response = await axios({
        method: 'post',
        url: 'https://portal.mahurangi.school.nz/kamar/api/api.php',
        data: qs.stringify({
            'Command': 'GetStudentTimetable',
            'Key': `${store.get('kamar.key')}`,
            'StudentID': `${store.get('kamar.username')}`,
            'Grid': '2021TT'
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Maverick Calender',
            'Origin': 'file://',
            'X-Requested-With': 'nz.co.KAMAR'
        }
    });
    */

    return JSON.stringify(parser.parse(await response.data));
})