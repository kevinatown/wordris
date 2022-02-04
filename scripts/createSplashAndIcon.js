const run = require('cordova-res');
const path = require('path');

console.log('Running icon and splash generator');

const configPath = path.join(__dirname, '../config.xml');
const iconPath = path.join(__dirname, '../resources/originals/w_logo_v1.png');
const splashPath = path.join(__dirname, '../resources/originals/w_splash_v1.png');

const icon = { sources: [ iconPath ] };
const splash = { sources: [ splashPath ] };

const options = {
  projectConfig: configPath,
  logstream: process.stdout,
  platforms: {
    android: { icon, splash },
    ios: { icon, splash },
  },
};

run(options).then(() => {
  console.log('Done');
}).catch(e => console.error(e));

