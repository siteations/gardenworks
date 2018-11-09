const fs = require('fs');
const sass = require('sass');
const postcssPresetEnv = require('postcss-preset-env');


var result = sass.renderSync({file: 'styles.scss'});

var css = result.css.toString();

//var css = fs.readFileSync("styles.css", "utf8");

postcssPresetEnv.process(css, {
		from: 'styles.css', to: '../gardenworksproject/themes/dev2018-theme-5bd7592d4445ea5bff1e29a8/styles.css' })
		.then(result => {
      fs.writeFile('../gardenworksproject/themes/dev2018-theme-5bd7592d4445ea5bff1e29a8/styles.css', result.css, () => true)
      if ( result.map ) {
        fs.writeFile('../gardenworksproject/themes/dev2018-theme-5bd7592d4445ea5bff1e29a8/styles.css.map', result.map, () => true)
      }
    })
    .catch(console.log);

