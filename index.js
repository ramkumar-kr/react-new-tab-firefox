var self = require('sdk/self');
var tabs = require("sdk/tabs");
var mod = require("sdk/page-mod");
const ntp = require('resource:///modules/NewTabURL.jsm');

ntp.NewTabURL.override(self.data.url("index.html"));
mod.PageMod({
  include: [self.data.url("index.html")],
  contentScriptFile: self.data.url("bookmarks.js"),
  onAttach: startListening
});

function startListening(worker_listen){
  worker_listen.port.on("get_bookmarks", function () {
    let { search, TOOLBAR } = require("sdk/places/bookmarks");
    search(
        [{ query: "", group: TOOLBAR }]
      ).on("end", function (item) {
      worker_listen.port.emit("bookmarks", item);
    });
  });
}
