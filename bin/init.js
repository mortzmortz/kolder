const fs = require('fs');
const path = require('path');
const co = require('co');
const $ = require('shelljs');
const tildify = require('tildify');
const install = require('yarn-install');
const kopy = require('kopy');
const chalk = require('chalk');
const inquirer = require('inquirer');
const _ = require('../lib/utils');
const AppError = require('../lib/app-error');

module.exports = co.wrap(function * (options) {

  const dest = options.name ? _.cwd(options.name) : process.cwd();

  if (!options.force && fs.existsSync(dest)) {
    if (!options.name) {
      const {currentDir} = yield inquirer.prompt([{
        name: 'currentDir',
        type: 'confirm',
        message: `You did not provide a directory. Confirm to overwrite all files at ${chalk.yellow(tildify(dest))}.`,
        default: false
      }]);
      if (!currentDir) {
        throw new AppError('> Aborted.');
      } else {
        const {safeOverWrite} = yield inquirer.prompt([{
          name: 'safeOverWrite',
          type: 'confirm',
          message: `Sorry, I have to ask again. Anyway, sure overwrite?`,
          default: false
        }]);
        if (!safeOverWrite) {
          throw new AppError('> Aborted.');
        } else {
          $.rm('-rf', `${dest}/*`);
        }
      }
    } else {
      const {overWrite} = yield inquirer.prompt([{
        name: 'overWrite',
        type: 'confirm',
        message: `Directory ${chalk.yellow(tildify(dest))} already exists, confirm to overwrite it anyway?`,
        default: false
      }]);
      if (!overWrite) {
        throw new AppError('> Aborted.');
      } else {
        const {safeOverWrite} = yield inquirer.prompt([{
          name: 'safeOverWrite',
          type: 'confirm',
          message: `Sorry, I have to ask again. Anyway, sure overwrite?`,
          default: false
        }]);
        if (!safeOverWrite) {
          throw new AppError('> Aborted.');
        } else {
          $.rm('-rf', `${dest}/*`);
        }
      }
    }
  }

  let usePrompts = options.prompts;

  const defaults = Object.assign({
    type: '',
    description: `My new Project`,
    starter: false,
    webDemo: false,
    vueStandaloneDemo: false,
    reactDemo: false,
    unit: false
  }, options);

  // --type=plain
  if (defaults.type === 'plain') {
    usePrompts = false;
    console.log('> Detected plain project type from CLI arguments, skipped prompts.');
  }

  const prompts = [
    {
      name: 'name',
      default: defaults.name,
      message: 'Choose the name for your new project:'
    },
    {
      name: 'description',
      default: defaults.description,
      message: 'Briefly describe your new project:'
    },
    {
      name: 'type',
      type: 'list',
      message: 'Choose the type of your new project:',
      choices: [{
        name: 'Plain Project',
        value: 'plain'
      },
      {
        name: 'Web Project',
        value: 'web'
      },
      {
        name: 'Vue App',
        value: 'vue'
      },
      {
        name: 'React App',
        value: 'react'
      }]
    },
    {
      name: 'webDemo',
      message: 'Want to add a short JavaScript Demo?',
      type: 'confirm',
      default: false,
      when: answers => answers.type === 'web'
    },
    {
      name: 'vueStandaloneDemo',
      message: 'Want to add a short JavaScript Demo?',
      type: 'confirm',
      default: false,
      when: answers => answers.type === 'vue'
    },
    {
      name: 'reactDemo',
      message: 'Want to add a short JavaScript Demo?',
      type: 'confirm',
      default: false,
      when: answers => answers.type === 'react'
    },
    {
      name: 'starter',
      message: 'Want to add Basic Styles?',
      type: 'confirm',
      default: false,
      when: answers => answers.type !== 'plain'
    },
    {
      name: 'unit',
      message: 'Do you want to add unit tests with AVA?',
      type: 'confirm',
      default: false,
      when: answers => answers.type === 'web'
    }
  ];

  const kopyOptions = {
    filters: {
      'demo/styles.html': 'starter',
      'demo-scss/**': '!starter && (webDemo || vueStandaloneDemo || reactDemo)',
      'src-plain/**': 'type === "plain"',
      'src-web/**': 'type === "web"',
      'src-vue/**': 'type === "vue"',
      'src-react/**': 'type === "react"',
      'starter-scss/**': 'starter',
      'starter-assets/**': 'starter',
      'src-web-demo/**': 'webDemo',
      'src-vue-demo/**': 'vueStandaloneDemo',
      'src-react-demo/**': 'reactDemo',
      'test/**': 'unit'
    }
  };

  if (usePrompts === false) {
    kopyOptions.data = defaults;
  } else {
    kopyOptions.prompts = prompts;
    kopyOptions.data = defaults;
  }

  const {files, merged} = yield kopy(_.ownDir('move'), dest, kopyOptions);

  console.log();

  for (const file of files) {
    console.log(`${chalk.green('Generating')} · ${file}`);
  }
  for (const file of ['gitignore', 'editorconfig', 'eslintrc.js']) {
    move(dest, file, `.${file}`);
  }

  if (merged.type === 'vue') {
    move(dest, 'src-vue', 'src');
  } else if (merged.type === 'react') {
    move(dest, 'src-react', 'src');
  } else if (merged.type === 'web') {
    move(dest, 'src-web', 'src');
  } else if (merged.type === 'plain') {
    move(dest, 'src-plain', 'src');
  }

  if (merged.starter) {
    move(dest, 'starter-scss', 'src/styles');
    move(dest, 'starter-assets', 'assets');
  } else if (merged.webDemo || merged.vueStandaloneDemo || merged.reactDemo) {
    move(dest, 'demo-scss', 'src/styles');
  }
  
  if (merged.webDemo) {
    move(dest, 'src-web-demo', 'src/javascripts');
  }
  if (merged.vueStandaloneDemo) {
    move(dest, 'src-vue-demo', 'src/javascripts');
  }
  if (merged.reactDemo) {
    move(dest, 'src-react-demo', 'src/javascripts');
  }

  console.log('\n> Installing dependencies for project:');
  install({cwd: dest});

  console.log(`\n${chalk.bgGreen.black(' DONE ')} Successfully generated into ${chalk.yellow(tildify(dest))}!\n`);

  console.log(chalk.green('- To get started:'));
  console.log();
  merged.name && console.log(`  cd ${merged.name}`);
  console.log('  yarn dev\n');

  console.log(chalk.green('- To build for production:'));
  console.log('\n  yarn build\n');

  console.log(chalk.bold(`For more info, please view ${merged.name}/README.md\n`));
})

function move(dir, from, to) {
  console.log(`${chalk.magenta('Moving    ')} · ${from} -> ${to}`);
  const dest = path.join(dir, to);
  $.rm('-rf', dest);
  $.mv(path.join(dir, from), dest);
}