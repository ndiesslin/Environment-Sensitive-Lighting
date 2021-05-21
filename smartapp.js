const SmartApp = require('@smartthings/smartapp');
const weather = require('./lib/weather');
const colorTemperatures = require('./constants/color_temperatures');

// Set lighting based on what weather gives us
async function setSwitchLevel(context) {
  // Get weather with user's zip code
  const currentWeather = await weather.getCurrentWeather(context.configStringValue('zipCode'));
  const userMaximumBrightness = context.configStringValue('maximumBrightnessLevel');
  const brightness = weather.getBrightnessLevel(currentWeather, userMaximumBrightness);
  // Get the user selected color temperature
  const colorTemperature = context.configStringValue('colorTemperature');
  const lightColor = colorTemperatures[colorTemperature];
  await context.api.devices.sendCommands(context.config.colorLight, [
    {
      capability: 'switch',
      command: 'on'
    },
    {
      capability: 'switchLevel',
      command: 'setLevel',
      arguments: [brightness] // TODO: can we use the rate to fade between changes?
    },
    {
      capability: 'colorControl',
      command: 'setColor',
      arguments: [lightColor]
    }
  ]);
}

/* Define the SmartApp */
module.exports = new SmartApp()
  .configureI18n()
  .enableEventLogging(2) // logs all lifecycle event requests and responses as pretty-printed JSON. Omit in production
  .page('mainPage', (context, page, configData) => {
      page.section('currentWeather', section => {
        section.numberSetting('zipCode')
          .required(true);
        section.enumSetting('weatherCheckDuration')
          .options([
            { id: '15', name: '15 Minutes' },
            { id: '30', name: '30 Minutes' },
            { id: '45', name: '45 Minutes' },
            { id: '60', name: '60 Minutes' }
          ])
          .defaultValue('15');
      });
      page.section('lights', section => {
        section.deviceSetting('colorLight')
          .capabilities(['colorControl', 'switch', 'switchLevel'])
          .permissions('rx')
          .required(true);
        section.enumSetting('colorTemperature')
          .options([
              { id: 'RED', name: 'redTint' },
              { id: 'YELLOW', name: 'yellowTint' },
              { id: 'WHITE', name: 'white' },
              { id: 'BLUEWHITE', name: 'blueWhiteTint' }
          ])
          .defaultValue('RED');
        section.enumSetting('maximumBrightnessLevel')
          .options([
              { id: '1', name: '1:1' },
              { id: '.5', name: '1:2' },
              { id: '.25', name: '1:4' }
          ])
          .defaultValue('1');
      });
  })
  .updated(async (context, updateData) => {
    // clear any existing configuration
    await context.api.schedules.delete()

    // set initial switch level on light
    await setSwitchLevel(context);

    // schedule future changes
    await context.api.schedules.schedule('weatherHandler', `0/${context.configStringValue('weatherCheckDuration')} * * * ? *`, 'UTC');
  })
  .scheduledEventHandler('weatherHandler', setSwitchLevel);