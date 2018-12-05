const inquirer = require('inquirer');

module.exports = {
  selectProjectName: async () => {
    const questions = [
      {
        type: 'input',
        message: 'Provide a project name',
        name: 'projectname',
      },
    ];

    return inquirer.prompt(questions);
  },

  styles: async () => {
    const questions = [
      {
        type: 'list',
        message: 'Select preprocessor that will be used in project',
        name: 'styles',
        choices: [
          {
            name: 'None (CSS)',
          },
          {
            name: 'Sass',
          },
          {
            name: 'SCSS',
          },
          {
            name: 'Stylus',
          },
          {
            name: 'LESS',
          },
        ],
      },
    ];

    return inquirer.prompt(questions);
  },

  server: async () => {
    const questions = [
      {
        type: 'confirm',
        message: 'Does your project need Browser-sync for developing?',
        name: 'server',
      },
    ];

    return inquirer.prompt(questions);
  },
};
