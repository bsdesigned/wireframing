# New Wireframe/prototype framework

## Introduction

This is a **Gulp/Bower/NPM** project that allows the rapid prototyping using **PHP**, **SaSS**, **jQuery** and **Spectre.css**.

The files that require changes are all in the **RESOURCES** folder and are then complied into the **BUILD** folder.


## Installation

1. Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/) globally
2. Install [Node.js](https://nodejs.org/en/) globally
3. Install the gem [scss_lint](https://rubygems.org/gems/scss_lint) globally
4. Create new project using the [repository](https://github.com/bsdesigned/wireframing.git)
5. Open terminal at the repository folder and run the following tasks
5. Run **'npm install'**
6. Run **'bower install'** in the repository folder
7. Change the **port numbers** if you would like to run multiple instances
7. Run **'gulp serve'**

Your server should now be up and running.

## Includes

To make life easier during development the following modules have been included:

### Node Modules

* gulp
* gulp-bower
* gulp-sass
* gulp-notify
* gulp-concat
* gulp-scss-lint
* browser-sync
* gulp-connect-php
* ip
* gulp-flatten
* gulp-imagemin
* gulp-clean
* gulp-util
* gulp-import-css
* gulp-cssmin
* gulp-rename

### Bower Modules

* Spectre.css
* Font Awesome
* jQuery