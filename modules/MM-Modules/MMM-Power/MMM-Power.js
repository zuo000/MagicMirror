Module.register("MMM-Power", {
  defaults: {
  },

  getStyles: function() {
    return ["MMM-Power.css"];
  },


  start: function() {
    console.log("Starting module: " + this.name);
  },

  monitorOff: function() {
    this.sendNotification("REMOTE_ACTION", { action: "MONITOROFF" });
  },

  getDom: function() {
    var self = this;
    var monitorOn = function() {
      window.removeEventListener("dblclick", monitorOn);
      self.sendNotification("REMOTE_ACTION", { action: "MONITORON" });
    };
    var wrapper = document.createElement("div");
    wrapper.className = "power_wrapper fa fa-power-off fa-1x";
    wrapper.addEventListener("click", function() {
      self.monitorOff();
      window.addEventListener("dblclick", monitorOn);
    });

    return wrapper;
  },
});
