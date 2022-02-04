const fs = require('fs');
const path = require('path');
const { cordova } = require('cordova-lib');

const isDev = process.env.NODE_MOBILE_ENV === 'development';
const developmentTeam = '<DEV_TEAM>';
const packageType = isDev ? 'development' : 'app-store';
const isAdHoc = process.env.NODE_MOBILE_ENV === 'AdHoc'
const codeSignIdentity = isDev || isAdHoc ? 'Apple Development' : 'Apple Distribution';
// tbd figureout better way to do this:
// TODO: replace prod provisioning profile
const provisioningProfile = isDev ? '<DEV_PROVISIONING_PROFILE>' :
  isAdHoc ? '<TESTFLIGHT_PROVISIONING_PROFILE>' : '<PROD_PROVISIONING_PROFILE>';
  
const options = {
  codeSignIdentity,
  developmentTeam,
  packageType,
  provisioningProfile,
  device: true
};

const build = async () => {
  try {
    await cordova.build({platforms: ['ios'], options });
  } catch (e) {
    console.log(`[CORDOVA]: ${e}`);
  }
}

build();
