/* global Module */

/* Magic Mirror
 * Module: iFrame
 *
 * By Ben Williams http://desertblade.com
 * MIT Licensed.
 */

Module.register("MMM-Map",{
		defaults: {
        frameWidth: "300",
				width:"100%",
        url: 'https://map.baidu.com/@13231558.82903156,3749333.2262791456,13.1z',
        scrolling: "no"
		},
    suspended: false,

    resume: function() {
      this.suspended = false;
      return this.updateDom();
    },
    suspend: function () {
      this.suspended = true;
      this.updateDom();
    },
    getStyles: function() {
      return [ "MMM-Map.css", ];
    },

    // Override dom generator.
    getDom: function() {
      if (this.suspended == true) {
        return document.createElement("div");
      }

      var { width, height } = this.config;
      var wrapper = document.createElement("div");

      wrapper.className = "mmm-map"
      wrapper.style.width = `${this.config.frameWidth}px`;

      var html = `
                  <div class="mmm-map-wrapper" style="padding-top: ${100 / (width / height)}%;">
                  <iframe
                    src="${this.config.url}"
                    width="${width}"
                    height="${height}"
                    scrolling="${this.config.scrolling}"
                  ></iframe>
                  </div>
                `;

      wrapper.insertAdjacentHTML("afterbegin", html);

      return wrapper;
	}

});
