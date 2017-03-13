var ghpages = require('gh-pages');
var path = require('path');
var repogitbook = require('../package.json').repogitbook;

ghpages.publish(path.join(__dirname, '/../docs'), {
  branch: 'master',
  repo: repogitbook.abian
}, function(err){
     console.log(err);
});
