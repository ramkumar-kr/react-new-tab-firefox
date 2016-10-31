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

  worker_listen.port.on("getFavicon", function(url){
    var img_id = url;
    console.log(img_id);
    let { getFavicon } = require("sdk/places/favicon");
    getFavicon(url).then(function(favicon_url){
      console.log("-----"+img_id+"-----");
      worker_listen.port.emit("favicon", favicon_url, img_id);
    }).catch(function(error){
      console.log(error);
      favicon_url = self.data.url("img/default.png");
      worker_listen.port.emit("favicon", favicon_url, img_id);
    })
  });
}

// chrome.bookmarks.getSubTree('0', function(bookmarks){
//   console.log(bookmarks);
//   // ReactDOM.render(<ListView bookmarks={bookmarks} />, document.getElementById('app'));
// });

