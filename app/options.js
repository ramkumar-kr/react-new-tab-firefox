import React from 'react';
import ReactDOM from 'react-dom';
import BookmarkFolder from "./components/bookmarkFolder";
import browser from 'webextension-polyfill';


var updateStyle = function () {
  var css = document.getElementById("reactCss").value;
  browser.storage.local.set({ "style": css });
};

browser.storage.local.get("style").then((css) => {
  if (css.style !== undefined) {
    document.getElementById("reactCss").value = css.style; 
  }
});

document.getElementById("styleForm").addEventListener("submit", updateStyle);

async function renderBookmarkFolder(){
  var prefs = await browser.storage.local.get();
  var bookmark = await browser.bookmarks.get(prefs.bookmarkId || "1");
  const allBookmarks = await browser.bookmarks.search({});
  var allFolders = getAllFolders(allBookmarks);
  console.table(allBookmarks);
  ReactDOM.render(<BookmarkFolder bookmark={bookmark[0]} folders={allFolders}/>, document.getElementById('bookmark-folder'));
}

function getAllFolders(allBookmarks) {
  return allBookmarks.filter((bookmark) => {
    return (bookmark.url === undefined);
  })
}

renderBookmarkFolder();