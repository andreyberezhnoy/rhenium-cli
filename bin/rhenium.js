#!/usr/bin/env node

'use strict'

const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')
const minimist = require('minimist')
const clear = require('clear')
const chalk = require('chalk')
const figlet = require('figlet')
const pkg = require('../package.json')
const configGenerator = require('../lib/configGenerator')
const resolveProjectName = require('../lib/resolveProjectName')
const outputHelp = require('../lib/helpers/outputHelp')

clear()

const run = async () => {
  // Parse all process arguments
  const args = minimist(process.argv.slice(2))
  // Check if user wants to view package version
  const isVersion = args.v || args.V || args.version
  // Check if user wants to view package help
  const isHelp = args.h || args.help

  console.log(
    chalk.hex('#FE9920')(
      figlet.textSync('RheniumCLI', {
        verticalLayout: 'full',
      })
    )
  )
  console.log('')

  if (isHelp) {
    await outputHelp()
    process.exit()
  }

  if (isVersion) {
    console.log(chalk.hex('#FE9920')(`✨  RheniumCLI version: ${pkg.version}`))
    process.exit()
  }

  const projectName = await resolveProjectName()
  const packageJson = {
    name: projectName,
    version: '0.1.0',
    private: true,
    scripts: {
      start: 'cross-env NODE_ENV=development npx gulp',
      build: 'cross-env NODE_ENV=production npx gulp',
    },
  }
  const config = await configGenerator()
  console.log('')
  console.log(`${chalk.yellow('ℹ')} Generating .rheniumrc config file...`)

  try {
    await fs.outputJSONSync(
      path.resolve(process.cwd(), projectName, '.rheniumrc'),
      config,
      {
        spaces: 2,
      }
    )
  } catch (err) {
    console.log(`${chalk.red('✖')} ${err}`)
    process.exit(1)
  }

  console.log(
    `${chalk.green('✔')} Successfully generated .rheniumrc in ${chalk.hex(
      '#FE9920'
    )(projectName)} directory!`
  )
  console.log('')

  const gulpDeps = ['gulp', 'pump', 'require-dir', 'fs-extra', 'cross-env']
  const userDeps = [
    'gulp-postcss',
    'autoprefixer',
    'gulp-sourcemaps',
    'gulp-imagemin',
  ]

  // TODO: move this to other file
  //
  switch (config.styles) {
    case 'sass':
    case 'scss':
      userDeps.push('node-sass', 'gulp-sass')
      break

    case 'stylus':
      userDeps.push('gulp-stylus')
      break

    case 'less':
      userDeps.push('gulp-less')
      break

    default:
      break
  }

  if (config.server.init) {
    userDeps.push('browser-sync')
  }
  //
  // End

  // Get all dependencies to install for project
  const dependencies = gulpDeps.concat(userDeps)

  console.log(`${chalk.yellow('ℹ')} Generating package.json...`)

  // Generate new package.json
  try {
    await fs.outputJSONSync(
      path.resolve(process.cwd(), projectName, 'package.json'),
      packageJson,
      {
        spaces: 2,
      }
    )
  } catch (err) {
    console.log(`${chalk.red('✖')} ${err}`)
    process.exit(1)
  }

  console.log(`${chalk.green('✔')} Successfully generated package.json!`)
  console.log('')

  console.log(`${chalk.yellow('ℹ')} Copying template files...`)

  // Copy project template contents, gulp config and its tasks
  try {
    await fs.copySync(
      path.resolve(__dirname, '../template/'),
      path.resolve(process.cwd(), projectName)
    )
    // Copy config
    await fs.copySync(
      path.resolve(__dirname, '../config/requireRheniumConfig.js'),
      path.resolve(process.cwd(), projectName, 'config/requireRheniumConfig.js')
    )
    // Copy html task
    await fs.copySync(
      path.resolve(__dirname, '../config/tasks/markup/'),
      path.resolve(process.cwd(), projectName, 'config/tasks/markup/')
    )
    // Copy needed styles task
    await fs.copySync(
      path.resolve(__dirname, `../config/tasks/styles/${config.styles}.js`),
      path.resolve(
        process.cwd(),
        projectName,
        `config/tasks/styles/${config.styles}.js`
      )
    )
    await fs.copySync(
      path.resolve(__dirname, '../config/tasks/images.js'),
      path.resolve(process.cwd(), projectName, 'config/tasks/images.js')
    )
    if (config.server.init) {
      await fs.copySync(
        path.resolve(__dirname, '../config/tasks/server.js'),
        path.resolve(process.cwd(), projectName, 'config/tasks/server.js')
      )
    }
    await fs.copySync(
      path.resolve(__dirname, '../config/tasks/watch.js'),
      path.resolve(process.cwd(), projectName, 'config/tasks/watch.js')
    )
    await fs.copySync(
      path.resolve(__dirname, '../gulpfile.js'),
      path.resolve(process.cwd(), projectName, 'gulpfile.js')
    )
  } catch (err) {
    console.log(`${chalk.red('✖')} ${err}`)
    process.exit(1)
  }

  console.log(`${chalk.green('✔')} Successfully copied all template files!`)
  console.log('')

  // We have to run npm in that directory that we created recently
  process.chdir(path.resolve(projectName))
  const pkgMgrArgs = ['install', '--save'].concat(dependencies)
  const depsToInstall = userDeps.join(', ')

  console.log(
    `${chalk.yellow('ℹ')} Installing Gulp and necessary plugins: ${chalk.hex(
      '#FE9920'
    )(depsToInstall)}...`
  )
  console.log('')

  try {
    await execa('npm', pkgMgrArgs, {
      stdio: 'inherit',
    })
  } catch (err) {
    console.log(`${chalk.red('✖')} ${err}`)
    process.exit(1)
  }

  console.log(`${chalk.green('✔')} Successfully installed all dependencies!`)
  console.log('')

  console.log(
    `🎉  Successfully initialized project in ${chalk.hex('#FE9920')(
      projectName
    )} directory!`
  )
  console.log('')
  console.log(
    `🚀  Now continue with typing ${chalk.hex('#FE9920')(
      'cd ' + projectName
    )} && ${chalk.hex('#FE9920')('npm start')} to start!`
  )
  console.log('')
  console.log(`🔥  Happy coding!`)
  process.exit(0)
}

run()
