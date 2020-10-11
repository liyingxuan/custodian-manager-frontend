/*
 * **************************************************************************************
 *  Copyright © 2014-2018 Ontology Foundation Ltd.
 *  All rights reserved.
 *
 *  This software is supplied only under the terms of a license agreement,
 *  nondisclosure agreement or other written agreement with Ontology Foundation Ltd.
 *  Use, redistribution or other disclosure of any parts of this
 *  software is prohibited except in accordance with the terms of such written
 *  agreement with Ontology Foundation Ltd. This software is confidential
 *  and proprietary information of Ontology Foundation Ltd.
 *
 * **************************************************************************************
 *
 */

"use strict";
const chalk = require("chalk");

// The semantic version parser used by npm
const semver = require("semver");

const packageConfig = require("../package.json");

// 🐚 Portable Unix shell commands for Node.js http://shelljs.org
const shell = require("shelljs");

function exec(cmd) {
  return require("child_process")
    .execSync(cmd)
    .toString()
    .trim();
}

const versionRequirements = [
  {
    name: "node",
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node,
  },
];

if (shell.which("npm")) {
  versionRequirements.push({
    name: "npm",
    currentVersion: exec("npm --version"),
    versionRequirement: packageConfig.engines.npm,
  });
}

module.exports = function() {
  const warnings = [];

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i];

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(
        mod.name +
          ": " +
          chalk.red(mod.currentVersion) +
          " should be " +
          chalk.green(mod.versionRequirement),
      );
    }
  }

  if (warnings.length) {
    console.log("");
    console.log(chalk.yellow("To use this template, you must update following to modules:"));
    console.log();

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i];
      console.log("  " + warning);
    }

    console.log();
    process.exit(1);
  }
};
