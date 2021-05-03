const puppeteer = require('puppeteer');

(async () => {
//   const browser = await puppeteer.launch();
const browser = await puppeteer.launch({
    headless:false,
    sloMo:300,
    devtools:true,
});
  
const page = await browser.newPage();
  await page.setViewport({
    width: 2560,
    height: 1080,
    deviceScaleFactor: 1,
  });

  await page.goto('https://www.passport.gov.ph/appointment/group',
  { waitUntil: 'networkidle0'});
  //await page.waitFor(5000);
  await page.select("select#numberOfApplicants", "2");

  await Promise.all([
    page.waitForNavigation(), // The promise resolves after navigation has finished
    page.click('[type="submit"]'), // Clicking the link will indirectly cause a navigation
  ]);

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

//   await page.screenshot({ path: 'example.png' });
//   await browser.close();
})();