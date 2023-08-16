'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

let blazorCopy = build.subTask('blazorCopy', (gulp, buildOptions, done) => {

  // make sure preBuild file will be copied again
  gulp.src('./src/**/blazorapp1/**/*.*')
    .pipe(gulp.dest('./lib/'));

    // Don't forget to tell SPFx you are done
    done();
});

// // register task to prebuild process
build.rig.addPreBuildTask(blazorCopy);

// Copy files to dist folder
// // add file-loader options
// build.configureWebpack.mergeConfig({
//   additionalConfiguration: (generatedConfiguration) => {
//     generatedConfiguration.module.rules.push(
//       {
//         test: /(blazorapp1).*\.*$/,
//         type: 'javascript/auto',
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[path][name].[ext]',
//             }
//           }
//         ]
//       }
//     );

//     return generatedConfiguration;
//   }
// });


// // add copy plugin
// const CopyPlugin = require("copy-webpack-plugin");
// var myPlugin = new CopyPlugin({
//   patterns: [
//     { from: "blazorapp1", to: "dist" }
//   ],
// });

// build.configureWebpack.mergeConfig({
//   additionalConfiguration: (generatedConfiguration) => {
//     generatedConfiguration.plugins.push(myPlugin);
//     return generatedConfiguration;
//   }
// });


build.initialize(require('gulp'));
