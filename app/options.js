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

async function updateNestedPref(event) {
  await browser.storage.local.set({NestedView: event.target.value});
  
}

document.getElementById("nested").addEventListener("click", updateNestedPref);
document.getElementById("flat").addEventListener("click", updateNestedPref);

document.getElementById("styleForm").addEventListener("submit", updateStyle);

document.getElementById("serverForm").addEventListener("submit", updateServer);

// document.getElementById("nestedFolderForm").addEventListener("submit", updateNestedPref);

async function renderBookmarkFolder(){
  var prefs = await browser.storage.local.get();
  document.getElementById("serverDomain").value = prefs.faviconServerURL || "https://icon-fetcher-go.herokuapp.com";
  if (prefs.NestedView && prefs.NestedView === "true") {
    document.getElementById("nested").checked = true
  } else {
    document.getElementById("flat").checked = true
  }
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