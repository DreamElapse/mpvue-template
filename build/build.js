require('./check-versions')()

var chalk = require('chalk')
var utils = require('./utils')

process.env.NODE_ENV = 'production'

process.env.BUILD_ENV = process.argv[2] || 'production'
if (process.env.BUILD_ENV === 'production') {
  if (!process.argv[3]) {
    console.log(chalk.red('  Do you know you are building with Production?\n'))
    console.log(chalk.red('  Please Ask For Backend With The Version NOW! NOW! NOW! NOW!\n'))
    process.exit(1)
  }
}

process.env.VERSION = utils.initialVersion(process.argv[3] || '')
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora(`building for ${process.env.BUILD_ENV}...`)
spinner.start()

rm(path.join(config.build.assetsRoot, '*'), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
