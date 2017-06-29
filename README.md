# ModernDevicePlatform

### Prerequisites

* OS X, Windows or Linux
* [Node.js](https://nodejs.org) v6 or newer
* [.NET Core](https://www.microsoft.com/net/core) and [.NET Core SDK](https://www.microsoft.com/net/core)
* [Visual Studio Code](https://code.visualstudio.com/) with [C# extension](https://github.com/OmniSharp/omnisharp-vscode) (or Visual Studio 2015 or newer)
* [Visual Studio 2017](https://www.visualstudio.com/thank-you-downloading-visual-studio/?sku=Community&rel=15) (*Optional but strongly recommended*)

### Getting Started

**Step 1**. Clone the latest

**Step 2**. Install project dependencies listed in [`project.json`](server/project.json) and
[`package.json`](package.json) files: 

```shell
$ npm install                   # Install both Node.js and .NET Core dependencies
```

**Step 3**. Finally, launch your web app:

```shell
$ node run                      # Compile and lanch the app, same as running: npm start
```

The app should become available at [http://localhost:3000/](http://localhost:3000/).
See [`run.js`](run.js) for other available commands such as `node run build`, `node run publish` etc.
You can also run your app in a release (production) mode by running `node run --release`, or without
Hot Module Replacement (HMR) by running `node run --no-hmr`.


### How to Deploy

Before you can deploy your app to [Azure App Service](https://azure.microsoft.com/services/app-service/),
you need to open Web App settings in [Azure Portal](https://portal.azure.com/), go to "Deployment
Source", select "Local Git Repository" and hit [OK]. Then copy and paste "Git clone URL" of your
Web App into [`run.js/publish`](run.js) file. Finally, whenever you need to compile your
app into a distributable format and upload that to Windows Azure App Service, simply run:

```shell
$ node run publish              # Same as running: npm run publish
```
