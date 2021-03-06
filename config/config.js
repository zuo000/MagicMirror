/*************** AUTO GENERATED BY REMOTE CONTROL MODULE ***************/

var config = 
{
  electronOptions: {},
  ipWhitelist: [
    '127.0.0.1',
    '::ffff:127.0.0.1',
    '::1'
  ],
  modules: [
    {
			module: "alert",
		},
    {
      module: 'clock',
      position: 'top_left',
      config: {}
    },
    {
      module: 'MM-Modules/MMM-Calendar',
      position: 'top_left',
      config: {}
    },
    {
      module: 'MMM-DarkSkyForecast',
      classes: 'default everyone',
      position: 'top_right',
      config: {
        apikey: 'YOUR APIKEY',
        latitude: 'YOUR CITY latitude',
        longitude: 'SAME',
        iconset: '3m',
        concise: false,
        forecastLayout: 'table',
        showHourlyForecast: false,
        showWind: false,
        showSummary: false,
        maxDailiesToShow: 5,
        label_high: '',
        label_low: '',
        label_days: [
          'Sun',
          'Mon',
          'Tue',
          'Wed',
          'Thur',
          'Fri',
          'Sat'
        ],
        label_ordinals: [
          'N',
          'NNE',
          'NE',
          'ENE',
          'E',
          'ESE',
          'SE',
          'SSE',
          'S',
          'SSW',
          'SW',
          'WSW',
          'W',
          'WNW',
          'NW',
          'NNW'
        ]
      }
    },
    {
      module: 'MM-Modules/MMM-ModuleBar',
      position: 'bottom_bar',
      header: 'Modules',
      classes: 'default everyone',
      config: {}
    },
    {
      module: 'MM-Modules/MMM-SystemStats',
      position: 'middle_center',
      config: {
        updateInterval: 10000,
        align: 'center',
        units: 'metric',
        view: 'textAndIcon'
      }
    },
    {
      module: 'MM-Modules/MMM-Earth',
      position: 'middle_center',
      config: {
        mode: 'Natural',
        rotateInterval: 1800000,
        MaxWidth: '50%',
        MaxHeight: '50%'
      }
    },
    {
      module: 'MM-Modules/MMM-ImagesPhotos',
      position: 'middle_center',
      config: {
        opacity: 0.9,
        animationSpeed: 1000,
        updateInterval: 10000
      }
    },
    {
      module: 'MM-Modules/MMM-Cursor',
      config: {}
    },
    {
      module: 'MM-Modules/MMM-PhoneNotification',
      position: 'top_center',
      header: 'Phone Notifications',
      config: {
        accessToken: 'YOUR TOKEN in PushBullet.com',
        numberOfNotifications: 5,
        displayNotificationIcon: true,
        displayMessage: true,
        displayCount: false,
        alert: false,
        fade: true,
        maxCharacters: 50,
        useEncryption: false,
        key: {
          password: 'YOUR PASSWORD',
          ident: 'YOUR IDENT'
        }
      }
    },
    {
      module: 'MM-Modules/MMM-Map',
      position: 'middle_center',
      config: {
        url: 'https://map.baidu.com/@13231558.82903156,3749333.2262791456,13.1z/maplayer%3Dtrafficrealtime',
        width: '900',
        height: '500',
        frameWidth: '900'
      }
    },
    {
      module: 'MM-Modules/MMM-HomeAssistant',
      position: 'middle_center',
      header: '',
      config: {
        host: 'YOUR URL',
        port: 'YOUR PORT',
        accessToken: 'YOUR ACCESS TOKEN',
        updateInterval: 5*1000,
      }
    },
    {
      module: 'MM-Modules/MMM-MotionEye',
      position: 'middle_center',
      config: {
        url: 'http://localhost:8081',
        forcedRefreshInterval: 60000,
        width: '800px',
        debug: true
      }
    },
    {
      module: 'MM-Modules/MMM-Remote-Control',
      config: {
        customCommand: {},
        customMenu: '',
        showModuleApiMenu: true,
        apiKey: ''
      }
    },
    {
      module: 'MM-Modules/MMM-TodayInHistory',
      position: 'middle_center',
      config: {
        appId: 'YOUR APIKEY in www.shenjian.io',
        maxEvents: 5
      }
    }
  ],
  paths: {
    modules: 'modules',
    vendor: 'vendor'
  }
}

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {module.exports = config;}

