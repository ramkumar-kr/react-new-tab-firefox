var updateStyle = function () {
  var css = document.getElementById("reactCss").value;
  browser.storage.local.set({ "style": css });
}

browser.storage.local.get("style").then((css) => {
  if (css.style != undefined) {
    document.getElementById("reactCss").value = css.style; 
  }
})

document.getElementById("styleForm").addEventListener("submit", updateStyle)