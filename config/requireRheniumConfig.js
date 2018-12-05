const fs = require('fs-extra');
const rheniumrc = fs.readJsonSync('./.rheniumrc');

module.exports = rheniumrc;
