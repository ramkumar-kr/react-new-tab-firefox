import React from 'react';
import ReactDOM from 'react-dom';
import BookmarkFolder from "./components/bookmarkFolder";


var updateStyle = function () {
  var css = document.getElementById("reactCss").value;
  browser.storage.local.set({ "style": css });
};

browser.storage.local.get("style").then((css) => {
  if (css.style !== undefined) {
    document.getElementById("reactCss").value = css.style; 
  }
});

var updateServer = function () {
  var domainName = document.getElementById("serverDomain").value;
  browser.storage.local.set({ faviconServerURL: domainName });
  window.location.reload();
}

document.getElementById("styleForm").addEventListener("submit", updateStyle);

document.getElementById("serverForm").addEventListener("submit", updateServer);

async function renderBookmarkFolder(){
  var prefs = await browser.storage.local.get();
  document.getElementById("serverDomain").value = prefs.faviconServerURL || "https://icon-fetcher-go.herokuapp.com";
  var bookmark = await browser.bookmarks.get(prefs.bookmarkId || "toolbar_____");
  const allBookmarks = await browser.bookmarks.search({});
  var allFolders = getAllFolders(allBookmarks);

  ReactDOM.render(<BookmarkFolder bookmark={bookmark[0]} folders={allFolders}/>, document.getElementById('bookmark-folder'));
}

function getAllFolders(allBookmarks) {
  return allBookmarks.filter((bookmark) => {
    return (bookmark.type === "folder");
  })
}

renderBookmarkFolder();