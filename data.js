const fs = require("fs");

let data = JSON.parse(fs.readFileSync(__dirname + '/src/dataset/germany__cities copy.json', 'utf8'));
let data__keys = Object.keys(data);

let links = []
for (let x = 0; x < data__keys.length; x++) {
    for (let y = 0; y < data[data__keys[x]].length; y++) {
        if ( data[data__keys[x]][y].links && data[data__keys[x]][y].links.length ) {
            for (let l = 0; l < data[data__keys[x]][y].links.length; l++) {
                if ( links.indexOf(data[data__keys[x]][y].links[l]) === -1 ) {
                    links.push(data[data__keys[x]][y].links[l])
                }
            }
        }
    }
}

// console.log(links.length)
//     const fs = require("fs");

//     let data = JSON.parse(fs.readFileSync(__dirname + '/src/dataset/countries__cities__1.json', 'utf8'));
//     let data__keys = Object.keys(data);

//     let count = 0
//     for (let x = 0; x < data__keys.length; x++) {
//             count += (data[data__keys[x]].length && data[data__keys[x]].length) || 0
//     }

    console.log(links.length)