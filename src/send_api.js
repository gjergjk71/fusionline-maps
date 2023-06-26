const { chromium, devices } = require('playwright');
const fs = require("fs");
var request = require('request');

let places = JSON.parse(fs.readFileSync(__dirname + '/dataset/germany__cities.json', 'utf8')).Germany.map(city => {
    return (city.links || []).map(link => ({
        link,
        ...city,
        links: undefined,
        skipped: city.skipped || 0
    }))
}).flat().reverse();
// let data__keys = Object.keys(data).filter(x => data[x].find(cities => !cities.api_sent)); //['Germany'] 
let data__keys_x = 0;

(async () => {
    while ( data__keys_x < places.length ) {
        console.log({ data__keys_x })
        let place = places[data__keys_x];
        // while ( place.api_sent || place.skipped > 0 ) {
        //     data__keys_x++;
        //     place = places[data__keys_x];
        // }
        console.log({ place })

        const context = await chromium.launchPersistentContext('', { headless: true });
        //   const context = await browser.newContext();
        const page = await context.newPage();
        // page._locator = page.locator
        // page.locator = async (a,b) => {
        //     console.log(a,b)
        //     try {
        //         const result = await page._locator(a,b);
        //         console.log({ result, textContent: result.textContent })
              
        //         return { ...result, textContent: async () => {
        //             try {
        //                 return await result.textContent({ timeout: 2500 });
        //             } catch(err) {
        //                 return "";
        //             }
        //         } }
        //     } catch(err) {
        //         console.log(err,'returning empty string')
        //         return { textContent: () => '' }
        //     }
        // }
        await context.route('**.jpg', route => route.abort());
        try {
            await page.goto(place.link);
        } catch (err) {
            console.log(err);
        }

        
        try {
            var title = await page.locator(
                '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.TIHn2 > div > div.lMbq3e',
                { timeout: 2500 }
            )?.textContent({ timeout: 2500 })
        } catch(err) {
            title = ''
            console.log(err);

        }
        try {
            var stars_count = await page.locator(
                '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.TIHn2 > div > div.lMbq3e > div.LBgpqf > div > div.fontBodyMedium.dmRWX > div.F7nice > span:nth-child(1) > span:nth-child(1)',
                { timeout: 2500 }
            )?.textContent({ timeout: 2500 })
        } catch(err) {
            stars_count = ''
            console.log(err);
        }
        try {
            var reviews_count = await page.locator(
                '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.TIHn2 > div > div.lMbq3e > div.LBgpqf > div > div.fontBodyMedium.dmRWX > div.F7nice > span:nth-child(2) > span > span',
                { timeout: 2500 }   
            )?.textContent({ timeout: 2500 })
        } catch(err) {
            reviews_count = ''
            console.log(err);
        }
        const imgs = await page.$$eval('.Liguzb', imgs => {
            return imgs.map(option => option.src);
        });
        console.log(imgs);
        const matchPathname = (imgs, index, url_) => {
            const url = new URL(imgs[index] || "https://www.google.com/not-valid");
            const url2 = new URL(url_);
            return url.pathname === url2.pathname
        }
        if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://www.google.com/images/cleardot.gif') &&
            matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
            matchPathname(imgs, 3, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') &&
            matchPathname(imgs, 4, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png') &&
            matchPathname(imgs, 5, 'https://www.gstatic.com/images/icons/material/system_gm/1x/verified_user_gm_blue_24dp.png')
        ) {
            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }
    
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(4) > a > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(5) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                website = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
    
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;        
        } else         if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://fonts.gstatic.com/s/i/googlematerialicons/event/v14/gm_blue-24dp/1x/gm_event_gm_blue_24dp.png') &&
            matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png') &&
            matchPathname(imgs, 3, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
            matchPathname(imgs, 4, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') &&
            matchPathname(imgs, 5, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png')
        ) {
            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }
    
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(9) > div:nth-child(7) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(9) > div:nth-child(6) > a > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                website = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(9) > div:nth-child(8) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
    
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;        
        } else if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png') &&
            matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
            matchPathname(imgs, 3, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png')
        ) {
            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }
    
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(5) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(4) > a > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                website = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
    
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;        
        }else if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
            matchPathname(imgs, 2, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') &&
            matchPathname(imgs, 3, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png')
        ) {
            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }
    
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(5) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(4) > a > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                website = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
    
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;        
        } else if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://www.google.com/images/cleardot.gif') &&
            matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png') &&
            matchPathname(imgs, 3, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
            matchPathname(imgs, 4, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') &&
            matchPathname(imgs, 5, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png')
        ) {
            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }
    
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(7) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > a > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                website = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(8) > button > div > div.rogA2c',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
    
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;        
        } else if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png',) &&
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png',) &&
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png',) &&
            matchPathname(imgs, 0, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png',) &&
            matchPathname(imgs, 0, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png',) &&
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/verified_user_gm_blue_24dp.png')
        ) {
            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }
    
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > button > div > div.rogA2c',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(5) > a > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                website = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(7) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
    
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;        
        }  else if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://www.google.com/images/cleardot.gif') &&
            matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png') &&
            matchPathname(imgs, 3, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png') &&
            matchPathname(imgs, 4, 'https://www.gstatic.com/images/icons/material/system_gm/1x/verified_user_gm_blue_24dp.png')
        ) {
            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }
    
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(4) > a > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > a > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                website = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
    
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;        
        } else if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://www.google.com/images/cleardot.gif') &&
            matchPathname(imgs, 2, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') &&
            matchPathname(imgs, 3, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png') &&
            matchPathname(imgs, 4, 'https://www.gstatic.com/images/icons/material/system_gm/1x/verified_user_gm_blue_24dp.png')
        ) {
            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }
    
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(4) > a > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
    
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;        
        }else if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://fonts.gstatic.com/s/i/googlematerialicons/event/v14/gm_blue-24dp/1x/gm_event_gm_blue_24dp.png') &&
            matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png') &&
            matchPathname(imgs, 3, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
            matchPathname(imgs, 4, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') &&
            matchPathname(imgs, 5, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png') &&
            matchPathname(imgs, 6, 'https://gstatic.com/local/placeinfo/lgbtq_friendly_ic_24dp.png')
        )  {
            try {
                await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.cXHGnc > div > img[src="//www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png"]'
                )
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);

            }
            try {
              
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > a > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                website = ''
                console.log(err);
    
            }
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(7) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(8) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
    
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;        

        } else if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://www.google.com/images/cleardot.gif') &&
            matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png') &&
            matchPathname(imgs, 3, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
            matchPathname(imgs, 4, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') &&
            matchPathname(imgs, 5, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png') &&
            matchPathname(imgs, 6, 'https://www.gstatic.com/images/icons/material/system_gm/1x/verified_user_gm_blue_24dp.png')
        )  {
            try {
                await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.cXHGnc > div > img[src="//www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png"]'
                )
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);

            }
            try {
              
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > a > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                website = ''
                console.log(err);
    
            }
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(7) > button',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(8) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
    
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;        

        } else if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png') &&
            matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
            matchPathname(imgs, 3, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') && 
            matchPathname(imgs, 4, 'https://www.gstatic.com/images/icons/material/system_gm/1x/verified_user_gm_blue_24dp.png')
        ){
            try {
                await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.cXHGnc > div > img[src="//www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png"]'
                )
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);

            }
            try {
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(5) > a > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                website = ''
                console.log(err);
    
            }
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(7) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
    
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;        
        } else if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png') &&
            matchPathname(imgs, 2, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') &&
            matchPathname(imgs, 3, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png')
        ){
            try {
                await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.cXHGnc > div > img[src="//www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png"]'
                )
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);

            }
            try {
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(5) > a > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                website = ''
                console.log(err);
    
            }
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(5) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
    
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;        
        } else if (
            matchPathname(imgs,0, "https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png") &&
            matchPathname(imgs, 1, "https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png") &&
            matchPathname(imgs, 2, "https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png") &&    
            matchPathname(imgs, 3, "https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png") &&    
            matchPathname(imgs, 4, "https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png") &&
            matchPathname(imgs, 5, "https://www.gstatic.com/images/icons/material/system_gm/1x/verified_user_gm_blue_24dp.png")
        ) { 
            try {
                await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.cXHGnc > div > img[src="//www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png"]'
                )
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);

            }
            try {
                await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(5) > a > div > div.cXHGnc > div > img[src="//www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png"]',
                )
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(5) > a > div > div.rogA2c.ITvuef > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                website = ''
                console.log(err);
    
            }
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(5) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
    
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;        
        }
        else if (
            matchPathname(imgs, 0, "https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png") &&
            matchPathname(imgs, 1, "https://fonts.gstatic.com/s/i/googlematerialicons/event/v14/gm_blue-24dp/1x/gm_event_gm_blue_24dp.png") &&
            matchPathname(imgs, 2, "https://www.gstatic.com/images/icons/material/system_gm/1x/list_gm_blue_24dp.png") &&
            matchPathname(imgs, 3, "https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png") &&
            matchPathname(imgs, 4, "https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png") &&
            matchPathname(imgs, 5, "https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png")
        ) {
            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(9) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }
    
            try {
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(9) > div:nth-child(5) > a > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                website = ''
                console.log(err);
    
            }
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(9) > div:nth-child(8) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(9) > div:nth-child(9) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
    
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;        

        } else if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://www.google.com/images/cleardot.gif') &&
            matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png') &&
            matchPathname(imgs, 3, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
            matchPathname(imgs, 4, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') &&
            matchPathname(imgs, 5, 'https://gstatic.com/local/placeinfo/lgbtq_friendly_ic_24dp.png')
            
        )  {
            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }
    
            try {
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > a > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                website = ''
                console.log(err);
    
            }
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(7) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(8) > button > div',
                    { timeout: 2500 }    //#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > button > div
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
    
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;        
        } else if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://www.gstatic.com/images/icons/material/system_gm/1x/schedule_gm_blue_24dp.png') &&
            matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png') &&
            matchPathname(imgs, 3, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
            matchPathname(imgs, 4, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png')
        ) {
            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(9) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }
    
            try {
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(9) > div:nth-child(5) > a > div > div.rogA2c.ITvuef > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                website = ''
                console.log(err);
    
            }
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(9) > div:nth-child(6) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(9) > div:nth-child(7) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;
        } else if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
            matchPathname(imgs, 2, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') &&
            matchPathname(imgs, 3, "https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png") &&
            matchPathname(imgs, 4, 'https://www.gstatic.com/images/icons/material/system_gm/1x/verified_user_gm_blue_24dp.png')
        ) {
            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }
    
            try {
                website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(4) > a'
                )
                new URL(website)
            } catch (error) {
                website = '';
            }
    
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(5) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(5) > button',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;

        }  else if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://www.gstatic.com/images/icons/material/system_gm/1x/schedule_gm_blue_24dp.png') &&
            matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png') &&
            matchPathname(imgs, 3, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
            matchPathname(imgs, 4, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png')
        ) {
            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(9) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }
    
            try {
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(9) > div:nth-child(5) > a > div > div.rogA2c.ITvuef > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                website = ''
                console.log(err);
    
            }
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(9) > div:nth-child(6) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(9) > div:nth-child(7) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;
        } else if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://www.google.com/images/cleardot.gif') &&
            matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
            matchPathname(imgs, 3, "https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png") &&
            matchPathname(imgs, 4, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png') &&
            matchPathname(imgs, 5, 'https://www.gstatic.com/images/icons/material/system_gm/1x/verified_user_gm_blue_24dp.png')
        ) {
            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }
    
            try {
                website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(4) > a'
                )
                new URL(website)
            } catch (error) {
                website = '';
            }
    
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(5) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;
        } else if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png') &&
            matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
            matchPathname(imgs, 3, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') && 
            matchPathname(imgs, 4, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png')
        ) {
            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }
            try {
                website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(4) > a'
                )
                new URL(website)
            } catch (error) {
                website = '';
            };
            try {
                phone_number = await page.locator('#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > button > div')?.textContent({ timeout: 2500 });
            } catch (err) {
                phone_number = '';
                console.log(err);
            }

            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(7) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;

        } else if (
            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://www.google.com/images/cleardot.gif') &&
            matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png') &&
            matchPathname(imgs, 3, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
            matchPathname(imgs, 4, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') &&
            matchPathname(imgs, 5, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png') &&
            matchPathname(imgs, 6, 'https://gstatic.com/local/placeinfo/lgbtq_friendly_ic_24dp.png')
        ) {

            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3)',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }
    
            try {
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > a > div',
                    { timeout: 2500 }
                )?.textContent({ timeout: 2500 })
            } catch( err) {
                website = ''
                console.log(err);
            }
    
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(7) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;
        
        } else if (
(            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') &&
            matchPathname(imgs, 2, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png') &&
            matchPathname(imgs, 3, 'https://www.gstatic.com/images/icons/material/system_gm/1x/verified_user_gm_blue_24dp.png')
) || (
    matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
    matchPathname(imgs, 1, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') &&
    matchPathname(imgs, 2, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png') &&
    matchPathname(imgs, 3, 'https://www.gstatic.com/images/icons/material/system_gm/1x/verified_user_gm_blue_24dp.png')
) ||
(
    matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
    matchPathname(imgs, 1, 'https://www.google.com/images/cleardot.gif') &&
    matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
    matchPathname(imgs, 3, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') &&
    matchPathname(imgs, 4, 'https://www.gstatic.com/images/icons/material/system_gm/1x/verified_user_gm_blue_24dp.png')
)

        ) {
            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }

            try {
                website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(4) > a'
                )
                new URL(website)
            } catch (error) {
                website = '';
            }
            phone_number = 'ALERT';
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(4) > button',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;
        } else if (
(            (matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
            matchPathname(imgs, 1, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png') &&
            matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png') &&
            matchPathname(imgs, 3, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
            matchPathname(imgs, 4, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png')) &&
            matchPathname(imgs, 5, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png')) || (
                matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
                matchPathname(imgs, 1, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png') &&
                matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
                matchPathname(imgs, 3, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') &&
                matchPathname(imgs, 4, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png')  ||

                (            matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
                matchPathname(imgs, 1, 'https://www.gstatic.com/images/icons/material/system_gm/1x/public_gm_blue_24dp.png') &&
                matchPathname(imgs, 2, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
                matchPathname(imgs, 3, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') &&
                matchPathname(imgs, 4, 'https://maps.gstatic.com/consumer/images/icons/1x/send_to_mobile_alt_gm_blue_24dp.png')) ||
                (
                    matchPathname(imgs, 0, 'https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png') &&
                    matchPathname(imgs, 1, 'https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png') &&
                    matchPathname(imgs, 2, 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png') &&
                    matchPathname(imgs, 3, 'https://www.gstatic.com/images/icons/material/system_gm/1x/verified_user_gm_blue_24dp.png')
                )
            )
            
        )  {
            try {
                var address = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(3) > button > div > div.rogA2c > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                address = ''
                console.log(err);
    
            }
    
            try {
                var website = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > a > div > div.rogA2c.ITvuef > div.Io6YTe.fontBodyMedium.kR99db',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                website = ''
                console.log(err);
    
            }
            try {
                var phone_number = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(4) > button > div',
                    { timeout: 2500 }   
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                phone_number = ''
                console.log(err);
            }
            try {
                var plus_code = await page.locator(
                    '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(5) > button > div > div.rogA2c',
                    { timeout: 2500 }    //#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div:nth-child(6) > button > div
                )?.textContent({ timeout: 2500 })
            } catch(err) {
                plus_code = ''
                console.log(err);
    
            }
            console.log(
            {
                title, stars_count, reviews_count, address,
                website, phone_number, plus_code
    
            })
            place.api_sent = true;        
        }
        else {
            console.log("HERE")
            place.skipped++;
            data__keys_x++;
            context.close()
            continue;
        }
        request.post('https://linecontact.pythonanywhere.com/places/', {
            'auth': {
                'user': 'linecontact',
                'pass': 'line.123'
            },
            form: {
                url: place.link, title, stars_count, reviews_count, address,
                website, phone_number, plus_code
            }
        }, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
          })
    
        data__keys_x++;
        context.close()
    }
})()