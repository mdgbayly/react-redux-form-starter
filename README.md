# react-redux-form-starter

This is a simple starter app for react-redux-form

## Building

Install dependencies via NPM:

```shell
npm install
```

This app supports two main ways of building and running.

1. Using the webpack dev server
2. Using standard webpack bundle loading

### Using Webpack Dev server

The preferred way to build and run is to use the [webpack dev server](http://webpack.github.io/docs/webpack-dev-server.html).  This allows [Hot Module Replacement (HMR)](http://webpack.github.io/docs/hot-module-replacement-with-webpack.html) for both react and redux components, which allows you to change running code without a page reload, which can significantly improve developer productivity.

```shell
npm start
```

Webpack is currently only used to bundle the JavaScript. CSS and other assets are still deployed to the `dist` directory.

### Using standard Webpack module loading

In this mode, Webpack is still used to create the application bundle, but Hot Module Replacement is not enabled.
It just builds application assets to the `dist` directory.

```shell
npm run build
```

### Using Redux DevTools

In both modes, the app also supports using [Redux DevTools](https://github.com/gaearon/redux-devtools) which let you inspect every state and action payload and let you go back in time by "cancelling" actions.  Combined with HMR, they also allow you to re-evaluate actions when your reducer code changes. Redux devtools are turned on by default but you can disable them by updating your npm config before you start a build.

```shell
npm config set react-redux-form-starter:devTools false
```

> **Important**: For some reason the React Developer Tools Chrome extension appears to cause significant performance degradation when using HMR or Redux DevTools.  So it is recommended to disable the React Developer Tools Chrome extension when running in these modes. Switch to a standard npm run build with Redux DevTools disabled if you want to use React Developer Tools.


### Running unit tests locally

This app uses Karma and Mocha for unit tests. The recommended way to run the tests locally when developing and for debugging is to run

```shell
npm run watch:test
```
This will run tests without code coverage instrumentation and with full transpiled code which I generally find easier for debugging.
If you want to experiment with different source maps options supported by webpack, view the webpack [devtool docs](http://webpack.github.io/docs/configuration.html#devtool).

### Using the React Developer Tools Chrome extension

By default, this app doesn't support using React Developer tools as it runs in an iframe.  To support using React Developer tools, development builds of this app use an `index-dev.html` which hooks the React Developer Tools. However, this involves reaching up into the parent window which violates "Same Origin" security policies. To work around this you must run an instance of Chrome with the `disable-web-security` flag set.

This is not recommended for use with regular browsing, but you can set up an additional Chrome instance using a batch file like this.  

```shell
chrome-dev.bat
start "" "c:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="c:/_chrome_dev" --disable-web-security
```

> **Important**: I also configure this instance with a garish theme to remind myself not to do regular web browsing with it.

## Simulating a production build

It is also possible to simulate running a production build locally. This removes any dev only code such as DevTools integration and HMR.  It also minifies the Javascript code.  This mode could be used for iterating code when doing performance profiling.

```shell
npm run build:prod
```
