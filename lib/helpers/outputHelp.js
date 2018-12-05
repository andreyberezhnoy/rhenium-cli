const chalk = require('chalk');

module.exports = async function outputHelp() {
  console.log(`Usage: rhenium [command]`);
  console.log(``);
  // console.log(`Commands:`);
  // console.log(
  //   `  init                               create user-configureted project`
  // );
  // console.log(``);
  console.log(`Options:`);
  console.log(``);
  console.log(`  -v, -V, --version                  output the version number`);
  console.log(`  -h, --help                         output usage information`);
  console.log(``);
  console.log(`    In case of any problems:`);
  console.log(
    chalk.hex('#FE9920')(`      https://github.com/Kurzdor/rhenium-cli/issues/`)
  );

  return true;
};
