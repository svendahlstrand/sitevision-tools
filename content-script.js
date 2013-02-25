var utils = {
  isSiteVision: function () {
    var stylesheets = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < stylesheets.length; i++) {
      var stylesheet = stylesheets[i];

      if (stylesheet.href.indexOf('/sitevision') != -1) {
        return true;
      }
    }

    return false;
  }
};

if (utils.isSiteVision()) {
  chrome.extension.sendMessage({});
}