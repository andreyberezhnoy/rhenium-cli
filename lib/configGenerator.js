const inquirer = require('./inquirer')

module.exports = async function configGenerator() {
  const config = {
    styles: '',
    server: {
      init: false,
      config: {
        server: {
          baseDir: './tmp/',
        },
        https: true,
        host: 'localhost',
        port: 9000,
        logConnections: true,
        reloadOnRestart: true,
      },
      watch: './src/**/*.*',
    },
    // postcss: {
    //   plugins: {
    //     autoprefixer: {
    //       browsers: ['>0.25%', 'Firefox ESR', 'Safari >= 6'],
    //     },
    //   },
    // },
    directories: {
      src: {
        html: './src/*.html',
        css: './src/css/**/*.css',
        sass: './src/sass/style.sass',
        scss: './src/scss/style.scss',
        stylus: './src/scss/style.styl',
        less: './src/scss/style.less',
        images: './src/images/**/*.+(jpg|jpeg|png|svg)',
      },
      dev: {
        html: './tmp/',
        css: './tmp/static/css/',
        images: './tmp/images',
      },
      prod: {
        html: './build/',
        css: './build/static/css/',
        images: './build/images',
      },
      watch: {
        html: './src/**/*.html',
        css: './src/css/**/*.css',
        sass: './src/sass/**/*.sass',
        scss: './src/scss/**/*.scss',
        stylus: './src/scss/**/*.styl',
        less: './src/scss/**/*.less',
        images: './src/images/**/*.+(jpg|jpeg|png|svg)',
      },
    },
  }

  const { styles } = await inquirer.styles()
  switch (styles) {
    case 'Sass':
      config.styles = 'sass'
      break

    case 'SCSS':
      config.styles = 'scss'
      break

    case 'Stylus':
      config.styles = 'stylus'
      break

    case 'LESS':
      config.styles = 'less'
      break

    default:
      config.styles = 'css'
      break
  }

  const { server } = await inquirer.server()
  config.server.init = server

  return config
}
