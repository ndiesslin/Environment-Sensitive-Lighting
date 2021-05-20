# Environment Sensitive Lighting - Lights that adjust based on time of day and cloudiness.

The purpose of this repository is to demo the making of a SmartThings SmartApp. The demo will adjust lighting brightness based on the time of day and cloudiness outside.

Goals:
- [x] NodeJS application hosted in local environment.
- [x] Api calls to check weather and sunrise/sunset.
- [x] Adjust lighting levels based on cloudiness or if we are arriving to sunset or sunrise.
- [] No checking of the weather between sunset and sunrise.
- [] Add adjustment duration between lighting change, so our lighting fades between changes.

Use cases:
- Hallway lighting.
- Kitchen lighting.
- Outdoor lighting.
- Adjusting lighting for seasonal affective disorder.

TODO: Describe setup

## Setup

### Prerequisites
- A SmartThings compatible color light.
- An [OpenWeather](https://api.openweathermap.org) account (the free tier is all that is needed).
- A [Samsung account](https://account.samsung.com/membership/index.do)
- The SmartThings mobile application [Android](https://play.google.com/store/apps/details?id=com.samsung.android.oneconnect&hl=en_US&gl=US) or [iOS](https://apps.apple.com/us/app/smartthings/id1222822904).
- A SmartThings [Developer Workspace](https://smartthings.developer.samsung.com/workspace/) account. You can use your Samsung account login for the Developer Workspace.
- A [Vercel](https://vercel.com/signup) account if you want to host your project.
- [Node.js](https://nodejs.org) installed locally.
- [npm](https://npmjs.com) installed locally.
- [ngrok](https://ngrok.com/) installed locally to create a secure tunnel and create a globally available URL for fast testing.

### Getting started

#### Local setup
- Get an API key from your [OpenWeather](https://home.openweathermap.org/api_keys) account.
- Copy the .env.example file to .env in this project's root directory. You can use this command in the root directory of this project: `cp .env.example .env`. Replace `YOUR_API_KEY_HERE` with your open weather api key.
- Run `npm install`, to install the project dependencies.
- Start ngrok `ngrok http 3000`. Once started, copy and save the "Forwarding" HTTPS URL. This is the URL that will be provided in the [Developer Workspace.](https://smartthings.developer.samsung.com/workspace/)

#### SmartApp creation
- Login to the [Developer Workspace.](https://smartthings.developer.samsung.com/workspace/)
- In the [Developer Workspace](https://smartthings.developer.samsung.com/workspace/), create a new project.
- Select "Automation for the SmartThings App" as the project type.
- Give the project a desired name.
- Select "Register App", in the newly created project.
- Choose "WebHook Endpoint", and enter your ngrok HTTPS URL.
- Give your SmartApp a name and description.
- Enable the following OAuth2 scopes under "Permissions required by your connector app."
	- `r:devices:*`
	- `x:devices:*`
- Save the APP.
- You will not need the Client ID or Secret for this, but you can save it anyways.
- Click on "VERIFY APP REGISTRATION", this will send a post to your application with a url in your logs. Copy this url and visit it in your browser to verify the connection. 
- After you have verified your app registration, then click on the "Deploy to Test" button.

More information on:
- [Registering a SmartApp.](https://smartthings.developer.samsung.com/docs/smartapps/app-registration.html)
- [Verifying your domain ownership.](https://smartthings.developer.samsung.com/docs/smartapps/webhook-apps.html#Verify-your-domain-ownership)

#### Testing SmartApp on your phone
- Sign into the SmartThings app on your smart phone.
- Make sure you have a SmartLight added in the SmartThings app.
- __IMPORTANT:__ Enable developer mode in the SmartThings app by going to the settings menu and holding down on "About SmartThings" for five seconds. After this you should see an option to enable developer mode. The SmartThings app will need to restart.
- Open the menu in the SmartThings app and go to SmartApps. Click on the plus sign to add a new SmartApp. If you scroll to the bottom you should see this app listed under "Custom".
- Fill in the information in the prompt, then click "done > allow" and you should be able to see this project in action.

More information on:
- [Enabling developer mode in the SmartThings app.](https://smartthings.developer.samsung.com/docs/testing/developer-mode.html)
- [Testing a SmartApp.](https://smartthings.developer.samsung.com/docs/testing/how-to-test.html)

### Deploying as a service
- Install Vercel `npm i -g vercel`.
- Run `vercel` to login to Vercel.
- Once you are logged in run `vercel` again to setup your Vercel project.