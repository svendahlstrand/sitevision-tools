(function () {
  var utils = {
    isSiteVision: function () {
      // Online mode
      var stylesheets = document.querySelectorAll('link[rel="stylesheet"]');

      for (var i = 0; i < stylesheets.length; i++) {
        var stylesheet = stylesheets[i];

        if (stylesheet.href.indexOf('/sitevision') != -1) {
          return true;
        }
      }

      // Editor mode

      var title = document.querySelector('title').text;

      if (title.indexOf('SiteVision Server editor') != -1) {
        return true;
      }

      return false;
    }
  };

  if (utils.isSiteVision()) {
    chrome.extension.sendMessage({});
  }
}());
