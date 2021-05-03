const puppeteer = require('puppeteer');


function pagePNG(url, filename, applicantCount) {

  return puppeteer.launch({
    headless:false,
    sloMo:300,
    devtools:true,
}).then(async browser => {
    const page = await browser.newPage();

    await page.setViewport({
      width: 2543,
      height: 1081,
      deviceScaleFactor: 1,
    });

    await page.goto(url,
    { waitUntil: 'networkidle0'});
    //await page.waitFor(5000);
    await page.select("select#numberOfApplicants", applicantCount);
  
    await Promise.all([
      page.waitForNavigation(), // The promise resolves after navigation has finished
      page.click('[type="submit"]'), // Clicking the link will indirectly cause a navigation
    ]);
    
    // TO DO: generalize region selection
    await page.select("select#SiteRegionID", "3"); //North America value
    await page.waitFor(1000); //1 sec delay, wait for js to update other dropdowns
    await page.select("select#SiteCountryID", "3"); //United States of America value
    await page.select("select#SiteID", "43"); //PCG Los Angeles value
    await page.waitFor(1000); //1 sec delay, wait for last dropdown value to be selected
  
    let selector = 'button[value="next"]'; //css attribute selector format
    try{
      await Promise.all([
          page.waitForNavigation(), // The promise resolves after navigation has finished
          page.evaluate((selector) => document.querySelector(selector).click(), selector),// Clicking the link will indirectly cause a navigation
        ]);
    } catch (error){
      page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
      await page.evaluate(() => console.log(error));
    }
    
    //page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
    //await page.evaluate(() => console.log(`url is ${location.href}`));
    
    await page.waitFor(1000); //wait for page to load
    await page.screenshot({ path: `img/${filename}.png`, fullPage: true  });
    await browser.close();

    })
}

module.exports = {pagePNG}

//pagePNG('https://www.passport.gov.ph/appointment/group', 'baseline', '2')
  // (async () => {
  //   //   const browser = await puppeteer.launch();
  //   const browser = await puppeteer.launch({
  //       headless:false,
  //       sloMo:300,
  //       devtools:true,
  //   });