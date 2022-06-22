const fs = require('fs');

var createReadStream = function(){

    return fs.createReadStream('./data/dados.txt')

}

module.exports = createReadStream