const fs = require("fs");

let data = JSON.parse(fs.readFileSync(__dirname + '/dataset/germany__cities__dressmaker.json', 'utf8'));
let data__2 = JSON.parse(fs.readFileSync(__dirname + '/dataset/germany__cities__dressmaker__2.json', 'utf8'));
data__2.Germany = data__2.Germany.reverse()

const data_joined = { Germany: [] }

for ( let x = 0; x < data.Germany.length; x ++) {
    const dx = data.Germany[x];
    const dy = data__2.Germany[x];
    const d = dx.used ? dx : dy
    data_joined.Germany[x] = d;
}
 new Promise((resolve, reject) => {
    fs.writeFile(__dirname + '/dataset/germany__cities__dressmaker__joined.json', JSON.stringify(data_joined), (err) => {
        if (err)
          console.log('error: ', err);
        else {
          console.log("File written successfully - ", `${data__keys_x}/${data__keys_y}`);
        }
      });
      resolve();
})