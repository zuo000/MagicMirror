Module.register("MMM-ModuleBar",{

	requiresVersion: "2.1.0",

  defaults: {
      // Allow the module to force modules to be shown (if hidden and locked by another module ex. profile-switcher).
      allowForce: false,
      // Determines if the border around the buttons should be shown.
      showBorder: true,
      // The minimum width for all the buttons.
      minWidth: "0px",
      // The minimum height for all the buttons.
      minHeight: "0px",
      // The location of the symbol relative to the text. Options: left, right, top or bottom
      picturePlacement: "left",
      // The direction of the bar. Options: row, column, row-reverse or column-reverse
      direction: "row",
      // The speed of the hide and show animation.
      animationSpeed: 1000,
      // The default button 1. Add your buttons in the config.
      shown_module: null,
      buttons: {
          /*"1": {
          // The modules exact name to be affected.
          module: "clock",
          // The text to be displayed in the button.
          text:	"Clock",
          // Then symbol from font-awesome!
          symbol: "clock-o"
          },*/
          "1": {
            module: "MMM-Calendar",
            text:	"Calendar",
            symbol: "calendar"
          },
          "2": {
            module: "MMM-DarkSkyForecast",
            text:	"Weather Forecast",
            symbol: "cloud"
          },
          "3": {
            module: "MMM-PhoneNotification",
            text:	"Phone Notification",
            symbol: "bell"
          },
          "4": {
            module: "MMM-Earth",
            text:	"Earth",
            symbol: "globe"
          },
          "5": {
            module: "MMM-ImagesPhotos",
            text:	"Photos",
            symbol: "picture-o"
          },
          /*"6": {
            module: "MMM-RandomYouTubePlayer",
            text:	"Videos",
            symbol: "play"
          },*/
          "7": {
            module: "MMM-Map",
            text:	"Map",
            symbol: "map"
          },
          "8": {
            module: "MMM-HomeAssistant",
            text:	"Smart Home",
            symbol: "home"
          },
          "9": {
            module: "MMM-MotionEye",
            text:	"MotionEye",
            symbol: "video-camera"
          },
          "10": {
            module: "MMM-TodayInHistory",
            text:	"Today In History",
            symbol: "flag"
          },
          "11": {
            module: "MMM-10Seconds",
            text:	"10 Seconds",
            symbol: "repeat"
          },
          "12": {
            module: "MMM-SystemStats",
            text:	"System Status",
            symbol: "info-circle"
          },
      }
  },

	getStyles: function(){
      return ["font-awesome.css", "MMM-ModuleBar.css"];
	},

  getDom: function() {
      var menu = document.createElement("span");
      menu.className = "modulebar-menu";
      menu.id = this.identifier + "_menu";
      menu.style.flexDirection = this.config.direction;
      for (var num in this.config.buttons) {
          menu.appendChild(this.createButton(this, num, this.config.buttons[num], this.config.picturePlacement));
      }

      return menu;
  },

  createButton: function (self, num, data, placement) {
      var item = document.createElement("span");
      item.id = self.identifier + "_button_" + num;
      item.className = "modulebar-button small";
      item.style.minWidth = self.config.minWidth;
      item.style.minHeight = self.config.minHeight;

      var modules = MM.getModules();
      // When a button is clicked, the module either gets hidden or shown depending on current module status.
      item.addEventListener("click", function () {
          for (var i = 0; i < modules.length; i++) {
              if (modules[i].name === data.module) {
                  var idnr = modules[i].data.identifier.split("_");
                  if (idnr[1] == data.idnum || data.idnum == null) {
                      if (modules[i].hidden) {
                          if (modules[i].data.position == "middle_center" && self.shown_module != null) {
                            self.shown_module.hide(0, {force: self.config.allowForce});
                            self.shown_module = null;
                          }

                          if (data.showUrl != null) {
                              fetch(data.showUrl);
                              console.log("Visiting show URL: "+data.showUrl);
                          }

                          modules[i].show(self.config.animationSpeed, {force: self.config.allowForce});
                          console.log("Showing "+modules[i].name+" ID: "+idnr[1]);

                          if (modules[i].data.position == "middle_center") {
                            self.shown_module = modules[i];
                          }
                      }else{
                          modules[i].hide(self.config.animationSpeed, {force: self.config.allowForce});
                          console.log("Hiding "+modules[i].name+" ID: "+idnr[1]);

                          if (data.hideUrl != null) {
                              fetch(data.hideUrl);
                              console.log("Visiting hide URL: "+data.hideUrl);
                          }

                          if (modules[i].data.position == "middle_center") {
                            self.shown_module = null;
                          }
                      }
                  }
              }
          }
      });

      item.style.flexDirection = {
            "right"  : "row-reverse",
            "left"   : "row",
            "top"    : "column",
            "bottom" : "column-reverse"
      }[placement];

      if (!self.config.showBorder) {
            item.style.borderColor = "black";
      }

      if (data.symbol) {
          var symbol = document.createElement("span");
          symbol.className = "modulebar-picture fa fa-" + data.symbol;
          if (data.size) {
              symbol.className += " fa-" + data.size;
              symbol.className += data.size == 1 ? "g" : "x";
          }

          if (data.text && placement === "left") {
              symbol.style.marginRight = "4px";
          }
          item.appendChild(symbol);
      } else if (data.img) {
          var image = document.createElement("img");
          image.className = "modulebar-picture";
          image.src = data.img;

          if (data.width)  image.width  = data.width;
          if (data.height) image.height = data.height;
          if (data.text && placement === "left") {
              image.style.marginRight = "4px";
          }

          item.appendChild(image);
      }

      if (data.text) {
          var text = document.createElement("span");
          text.className = "modulebar-text";
          text.innerHTML = data.text;

          if ((data.symbol || data.img) && placement === "right") {
              text.style.marginRight = "4px";
          }
          item.appendChild(text);
      }
      return item;
  }
});


