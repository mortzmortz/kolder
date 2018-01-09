## tl;dr

```bash
yarn global add kolder
kolder my-project
cd my-project
yarn start
```

Go to `http://localhost:3000` and start coding!

Make a minified production build with `yarn build`.

#### Get Started Immediately

Tools like Webpack, Babel and ESLint are already pre-configured.<br>
Just create a project and start to code.

## Features

* **Plain.** Start a project/prototype quickly.
* **Build Web Project.**
* **Build React App.**
* **Basic Styles.** Optionally add basic styles.
* **CSS Hot Reloading.**
* **Code Formatting.** With Prettier

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

#### Babel

Babel Transpiler with following Presets:

* [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)

babel-preset-env include only the polyfills and transforms needed for the browsers specified in kolder.config.js

and following Plugins:

* [transform-object-rest-spread](https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread)
* [transform-class-properties](https://www.npmjs.com/package/babel-plugin-transform-class-properties)

#### PostCSS

PostCSS adds some useful stuff:

* [postcss-flexbugs-fixes](https://github.com/luisrudge/postcss-flexbugs-fixes) tries to fix all of [flexbug's](https://github.com/philipwalton/flexbugs) issues.

#### Prettier

Prettier Code Formatter is setup to get along nicely with ESLint.
Prettier can be run [in your editor](http://prettier.io/docs/en/editors.html) on-save, in a [pre-commit hook](https://prettier.io/docs/en/precommit.html), or in [CI environments](https://prettier.io/docs/en/cli.html#list-different).
Make sure to check out the [docs](https://prettier.io/docs/en/install.html).

#### Editor Config

Editor should use indentation of 2 spaces.<br>
If you want to change it, make sure to adjust ESLint settings too.

#### ESLint

Projects using [eslint-config-standard](https://github.com/standard/eslint-config-standard).

#### Module Statistics

If `statsOutput` is activated in your config File, `yarn build` exports two statistic files, which give you an overview about your bundles.

#### Webpack Dev Server

Webpack Dev Server with Hot Reloading is already set up and can be started with `yarn start`.

##### stats.json

Use it with [Official Analyse Tool](http://webpack.github.io/analyse/)

##### stats.html

Shows stats with [Webpack Visualizer Plugin](https://chrisbateman.github.io/webpack-visualizer/)

#### ENV Variable

Use environment variable to execute development only code.

```javascript
if (process.env.NODE_ENV !== 'production') console.log('');
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

#### devServerOpenPage

Type: `string`<br><br>
Dev Server will open on this path

#### devServerOverlay

Type `boolean`<br><br>
Shows compiling errors as overlay

#### browserlist

Type: `array`<br><br>
List of Browser used by CSS Autoprefixer. Look at [Browserlist Docs](https://github.com/ai/browserslist#queries) for more info:

#### eslint

Type: `object`<br><br>
Set Custom ESLint Rules. Find more infos in the [ESLint Docs](http://eslint.org/docs/rules/)

#### stylelint

Type: `object`<br><br>
Set Custom Stylelint Rules. Find more infos in the [Stylelint Docs](https://stylelint.io/user-guide/rules/)
