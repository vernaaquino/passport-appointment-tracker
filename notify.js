const libnotify = require('libnotify')

function notify(diffPixels) {
  if (diffPixels > 0) {
    console.log("THEERE HAS BEEN A CHANGE")
  }
  else{
      console.log("NO CHANGE")
  }
}

module.exports = notify