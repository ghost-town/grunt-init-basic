/**
 * grunt-init repo
 * https://github.com/jonschlinkert/repo
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a new github repo, with tests.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '';

// Template-specific notes to be displayed after question prompts.
exports.after = '';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'node'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('version', '0.1.0'),
    init.prompt('username', 'assemble'),
    init.prompt('description'),
    init.prompt('author_name', 'Jon Schlinkert'),
    init.prompt('author_url', 'https://github.com/jonschlinkert'),
    init.prompt('licenses'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('main', 'Grunt.js'),
    init.prompt('node_version', '>= 0.8.0'),
    init.prompt('npm_test', 'grunt test'),
    {
      name: 'travis',
      message: 'Will this project be tested with Travis CI?',
      default: 'Y/n',
      warning: 'If selected, you must enable Travis support for this project in https://travis-ci.org/profile'
    }
  ], function(err, props) {

    props.repository = 'https://github.com/' + props.username + '/' + props.name + '.git';
    props.homepage   = 'https://github.com/' + props.username + '/' + props.name + '/';
    props.bugs       = 'https://github.com/' + props.username + '/' + props.name + '/issues';
    props.scripts = {
      'test': 'grunt test'
    };
    props.devDependencies = {
      'assemble': '~0.4.2',
      'grunt-contrib-clean': '~0.4.1',
      'grunt-contrib-jshint': '~0.6.0',
      "grunt-contrib-nodeunit": "~0.2.0",
      'grunt-contrib-watch': '~0.5.1'
    };
    props.keywords = ['assemble'];

    // Setup travis CI
    props.travis = /y/i.test(props.travis);
    props.travis_node_version = '0.8';

    // Files to copy (and process).
    var files = init.filesToCopy(props);
    if (!props.travis) { delete files['.travis.yml']; }

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    var bower = {};
    bower.name = props.name;
    bower.main = 'Gruntfile.js';
    bower.dependencies = {
      'bootstrap': '~0.3.0'
    };

    // Generate bower.json file.
    init.writePackageJSON('bower.json',   bower);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
