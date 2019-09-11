const NodeHelper = require('node_helper');
var fs = require('fs');
var moment = require('moment');

module.exports = NodeHelper.create({
  start: function() {
    console.log("Starting node_helper for module: " + this.name);
  },

  socketNotificationReceived: function(notification, payload) {
    switch (notification) {
      case "10S_SAVE_DATA":
        this.saveData(payload);
        break;
      default:
        break;
    }
  },

  saveData: function(payload) {
    let buffer = new Buffer.from(payload);
    var filename = moment().format("YYYYMMDDHHmmss") + ".mp4";
    fs.writeFile("modules/MM-Modules/MMM-10Seconds/" + filename, buffer, {}, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    this.sendSocketNotification("10S_SAVE_DATA_RET", filename);
  },


});
