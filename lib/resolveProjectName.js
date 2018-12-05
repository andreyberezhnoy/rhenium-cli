const inquirer = require('./inquirer');

module.exports = async function resolveProjectName() {
  const projectName = await inquirer.selectProjectName();

  return projectName.projectname;
};
