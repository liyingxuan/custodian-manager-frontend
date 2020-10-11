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
require("./check-versions")();

process.env.NODE_ENV = "production";

// Elegant terminal spinner : https://github.com/sindresorhus/ora
const ora = require("ora");

// The UNIX command rm -rf for node : https://github.com/isaacs/rimraf
const rm = require("rimraf");

const path = require("path");

// 🖍 Terminal string styling done right : https://github.com/chalk/chalk
const chalk = require("chalk");

const webpack = require("webpack");
const config = require("../config");
const webpackConfig = require("./webpack.prod.conf");

const spinner = ora("building for production...");
spinner.start();

rm(path.join(config.prod.assetsRoot, config.prod.assetsSubDirectory), err => {
  if (err) throw err;
  webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + "\n\n",
    );

    if (stats.hasErrors()) {
      console.log(chalk.red("  Build failed with errors.\n"));
      process.exit(1);
    }

    console.log(chalk.cyan("  Build complete.\n"));
    console.log(
      chalk.yellow(
        "  Tip: built files are meant to be served over an HTTP server.\n" +
          "  Opening index.html over file:// won't work.\n",
      ),
    );
  });
});
