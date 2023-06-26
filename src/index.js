const { chromium, devices } = require('playwright');
const fs = require("fs");

let data = JSON.parse(fs.readFileSync(__dirname + '/dataset/germany__cities__dressmaker.json', 'utf8'));
data.Germany = data.Germany.reverse();
let data__keys = Object.keys(data).filter(x => data[x].find(cities => !cities.used)).reverse(); //['Germany'] 
let data__keys_x = 0;
let data__keys_y = 0;

(async () => {
    while ( data__keys_x <= data__keys.length ) {
        if ( data__keys_y > data[data__keys[data__keys_x]].length ) {
            data__keys_y++;
            if ( data[data__keys[data__keys_x]][data__keys_y] === undefined ) {
              data__keys_x++;
              data__keys_y = 0;
            }
        }
        const context = await chromium.launchPersistentContext('', { headless: true });
        //   const context = await browser.newContext();
          const page = await context.newPage();
     await (async () => {
          // Setup
        
          // The actual interesting bit
          await context.route('**.jpg', route => route.abort());
          try {
              await page.goto('https://www.google.com/maps');

          } catch (err) {
            console.log(err);
            return;
          }
        
          const searchboxinput = await page.locator('#searchboxinput')
        //   await searchboxinput.inputValue("garage")
          await searchboxinput.press("Enter")
        
          if (data[data__keys[data__keys_x]][data__keys_y] === undefined || data[data__keys[data__keys_x]][data__keys_y].used) {
            if (data[data__keys[data__keys_x]][data__keys_y] && data[data__keys[data__keys_x]][data__keys_y].used) {
              while ( data[data__keys[data__keys_x]][data__keys_y].used === true ) {
                // data__keys_x;
                data__keys_y++;
                if ( data[data__keys[data__keys_x]][data__keys_y] === undefined ) {
                  data__keys_x++;
                  data__keys_y = 0;
                }
                console.log("skipped")
              }
            } else if (data[data__keys[data__keys_x]][data__keys_y] === undefined) {
              return;
            }
          }
          for (let char_ of 'dressmaker ' + data[data__keys[data__keys_x]][data__keys_y].city) await searchboxinput.press(char_)
          await searchboxinput.press("Enter")
        
          let places;
          try {
              places = await page.waitForSelector(".hfpxzc", { timeout: 30000 });
          } catch (err) {
            console.log(err);
            return;
          }
        
        //   try {
        //       let isSingle = await page.waitForSelector('#QA0Szd > div > div > div.w6VYqd > div:nth-child(2) > div > div.e07Vkf.kA9KIf > div > div > div.TIHn2 > div > div.lMbq3e > div:nth-child(1) > h1', { timeout: 30000 });
        //       if (isSingle) {
        //         data__keys_y++;
        //         return console.log('isSingle');
        //       }
        //   } catch (err) {
        //     data__keys_y++;
        //     console.log(err);
        //     return;
        //   }
        
            await page.evaluate(async () => {
                function delay(time) {
                    return new Promise(resolve => setTimeout(resolve, time));
                }
                let loadings = 0;
                let delays = 0;
                while ( true ) {
                    let scroll_ = document.querySelector('#QA0Szd > div > div > div.w6VYqd > div:nth-child(2) > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd');
                    for (let i = 0; i < scroll_.scrollHeight; i += 10) {
                        scroll_.scroll(0,i)
                    }
                    if ( (await scroll_.innerHTML).indexOf("You've reached the end of the list.") !== -1) {
                        return;;
                    }
                    let loading = document.querySelector('#QA0Szd > div > div > div.w6VYqd > div:nth-child(2) > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd.QjC7t > div:nth-child(82) > div > div, #QA0Szd > div > div > div.w6VYqd > div:nth-child(2) > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd.QjC7t > div:last-child > div > div');
                    if (loading) loadings++;
                    if ( loadings > 10 ) return;
                    await delay(1000);
                    delays++;
                    if ( delays > 50 ) return
                }
            });
            await page.waitForSelector(".hfpxzc", { timeout: 30000 })
            data[data__keys[data__keys_x]][data__keys_y].links = await Promise.all((await page.$$('.hfpxzc')).map(l => l.getAttribute("href")) )
            data[data__keys[data__keys_x]][data__keys_y].used = true;
            data__keys_y++;
          //   console.log(places);
          //   await page.inputValue("garage")
            
          // Teardown
        })()
        await context.close();
        data__keys_y++;
        await new Promise((resolve, reject) => {
            fs.writeFile(__dirname + '/dataset/germany__cities__dressmaker__2.json', JSON.stringify(data), (err) => {
                if (err)
                  console.log('error: ', err);
                else {
                  console.log("File written successfully - ", `${data__keys_x}/${data__keys_y}`);
                }
              });
              resolve();
        }) 
    }
})()