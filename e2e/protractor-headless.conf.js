// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const protractorConf = require('./protractor.conf');

protractorConf.config.capabilities.chromeOptions = {
  args: [ '--headless', '--window-size=1920,1080' ]
};

/**
 * @type { import("protractor").Config }
 */
exports.config = protractorConf.config;
