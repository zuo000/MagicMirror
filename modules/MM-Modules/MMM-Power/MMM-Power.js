Module.register("MMM-Power", {
  defaults: {
  },

  getStyles: function() {
    return ["MMM-Power.css"];
  },


  start: function() {
    console.log("Starting module: " + this.name);
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.className = "power_wrapper fa fa-power-off";

    return wrapper;
  },
});
