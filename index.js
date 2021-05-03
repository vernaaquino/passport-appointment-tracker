require('dotenv').config()
const fetchPage = require('./fetch.js')
const notify = require('./notify.js')
const comparePage = require('./compare')
const fs = require('fs')

async function checkSite(url, applicantCount) {
    if (fs.existsSync('img/baseline.png')) {
      await fetchPage.pagePNG(url, 'compare', applicantCount)
      const result = await comparePage.pngDiff()
      notify(result)
    } else {
      let done = await fetchPage.pagePNG(url, 'baseline', applicantCount)
    }
  }


checkSite(process.env.SITEURL, process.env.APPLICANTCOUNT)
