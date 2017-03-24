#!/usr/bin/env node
const yargs = require('yargs');
const chalk = require('chalk');
const pkg = require('../package');

const argv = yargs
  .usage('\nkolder <project-name> <type>')
  .version(pkg.version)
  .command(
    'project-name', 
    `<project-name> is the directory kolder will be initialized in.
    If no directory is provided, the current directory will be asumed.`
  )
  .command('type', `<type> is the project type. You can skip prompts with providing --type=plain.`)
  .alias('h', 'help')
  .alias('v', 'version')
  .epilogue('for more information, visit https://github.com/mortzmortz/kolder')
  .help()
  .argv;

const name = argv._[0];
delete argv._;

const options = Object.assign({
  name
}, argv);

process.stdout.write('\x1Bc');
require('./init')(options).catch(err => {
  console.log();
  console.log(chalk.bgRed.black(' ERROR '), 'Error occurs during initializing a new project:\n');
  if (err.name === 'AppError') {
    console.log(chalk.red(err.message));
  } else {
    console.log(err.stack);
  }
  console.log();
  process.exit(1);
});
