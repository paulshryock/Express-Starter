# Express Starter

[![Netlify Status][netlify-deploy-status]][netlify-deploy] [![JavaScript Style Guide][standard-badge]][standard]

[![JWT Compatible][jwt-compatible-icon]][jwt]

This starter kit consists of an Express REST API with CRUD capabilities, powered by a Node server, connected to a MongoDB database by Mongoose, and hosted on Heroku. This powers a client-side JAMstack static website built with Eleventy, Gulp, and Webpack, hosted on Netlify, deployed to a CDN. The full stack has CI/CD setup - deploy by merging a pull request into the master branch on GitHub.

Sass is linted, transpiled into CSS, post-processed with PostCSS, beautified in development, and minified in production, with source maps. JavaScript is linted, transpiled with Babel, concatenated, and minified in production, with source maps.

This is an open source project which uses the [The Hippocratic License][license].

[NewProjectStarterKit.com][npsk]

## Quick Start

### Requirements

1. Node
  - Check if Node is installed: `node --version`
  - If you see a version number, such as `v12.11.1`, proceed to [Get Started](#get-started)
  - If Node isn't installed, [download][node-download] and install it, then proceed to [Get Started](#get-started)

### Get Started

Fork or clone this repo, install dev dependencies, and start:

```bash
git clone https://github.com/paulshryock/Express-Starter.git
cd Express-Starter
npm i
npm start
```

Then find and replace the author name (`Paul Shryock`) and package name (`Express-Starter`) in [`LICENSE`][license] and [`package.json`][pkg], and remove this line from `README.md`.

## Documentation

[Project documentation][docs] files are in the `_docs` directory.

## Contributing

If you'd like to contribute, please read the [Code of Conduct][code-of-conduct] and [Contributing instructions][contributing], then fork the repository and use a feature branch. Pull requests are welcome.

[netlify-deploy-status]: https://api.netlify.com/api/v1/badges/4a56c891-9260-44a1-a4b6-6e9522bc37a8/deploy-status
[netlify-deploy]: https://app.netlify.com/sites/express-starter/deploys
[standard-badge]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard]: https://standardjs.com
[jwt]: https://jwt.io/
[jwt-compatible-icon]: http://jwt.io/img/badge-compatible.svg
[npsk]: https://newprojectstarterkit.com/
[license]: https://firstdonoharm.dev/
[node-download]: https://nodejs.org/en/download/
[pkg]: package.json
[docs]: _docs/
[code-of-conduct]: CODE_OF_CONDUCT.md
[contributing]: CONTRIBUTING.md
