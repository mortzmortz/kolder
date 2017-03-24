## tl;dr

```bash
yarn global add kolder
kolder my-project
cd my-project
yarn dev
```

Go to `http://localhost:3000` and start coding!

Make a minified production build with `yarn build`.

#### Get Started Immediately

Tools like Webpack, Babel and ESLint are already pre-configured.<br>
Just create a project and start to code.

## Features

- **Plain.** Start a project quickly.
- **Build Web Project.**
- **Build Vue App**
- **Build React App**
- **PostCSS**
- **Basic Styles** Optionally add basic styles.
- **Unit Testing** Optionally add AVA (only for web projects yet).

## Requirements

Make sure to have `NodeJS` and `npm` installed from [NodeJS Website](https://www.nodejs.org)

You can use `npm` if you like, but `yarn` would save a lot time here. So make sure to have it installed.

```bash
npm install --global yarn
```

Further reading on installing `yarn` at [Yarn Installation Guide](https://yarnpkg.com/en/docs/install)

## Install

```bash
yarn global add kolder
```

## Usage

```bash
kolder my-project
```

Initialize a new project in current directory
```bash
kolder
```

Start a quick Prototype without answering any questions
```bash
kolder my-project --type=plain
```

## Preconfigured Settings

#### Editor Config
Editor should use indentation of 2 spaces.<br>
If you want to change it, make sure to adjust ESLint settings too.

#### ESLint
`VueJS` Projects using [eslint-config-vue](https://github.com/vuejs/eslint-config-vue).<br>
`Web` and `React` Projects using [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).

#### Webpack Dev Server
Webpack Dev Server with Hot Reloading is already set up and can be started with `yarn dev`.

#### Module Statistics
`yarn build` exports two statistic files, which give you an overview about your bundles.

##### stats.json
Use it with [Official Analyse Tool](http://webpack.github.io/analyse/)

##### stats.html
Shows stats with [Webpack Visualizer Plugin](https://chrisbateman.github.io/webpack-visualizer/)

#### Babel
Babel Transpiler with following Presets:
* [es2015](https://babeljs.io/docs/plugins/preset-es2015/)
* [stage-2](https://babeljs.io/docs/plugins/preset-stage-2/)

#### PostCSS
Compiles your SCSS based on browserlist settings.

#### ENV Variable
Use environment variable to execute development only code.

```javascript
if (process.env.NODE_ENV !== 'production') console.log('')
```

The above statement is minified away in production build.

## Custom Settings
### Configure Options in `kolder.config.js`

#### entry
Type: `string`<br><br>
Path to your entry JS file

#### path
Type: `string`<br><br>
Your output directory

#### filename
Type: `string`<br><br>
Names of the output files

#### devServerPort
Type: `number`<br><br>
Choose dev server port, default port is `http://localhost:3000`

#### devServerOpenAuto
Type: `boolean`<br><br>
Automatically opens Browser window when starting dev server

#### devServerOverlay
Type `boolean`<br><br>
Shows compiling errors as overlay

#### browserlist
Type: `array`<br><br>
List of Browser used by CSS Autoprefixer. Look at [Browserlist Docs](https://github.com/ai/browserslist#queries) for more info:

#### eslint
Type: `object`<br><br>
Set Custom ESLint Rules. Find more infos in the [ESLint Docs](http://eslint.org/docs/rules/)
