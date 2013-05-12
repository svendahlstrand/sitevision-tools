(function () {
  var utils = {
    isSiteVision: function () {
      // Admin tools mode
      if (window.location.pathname.indexOf('/editor/admin') == 0) {
        return true;
      }

      // Editor mode
      var title = document.querySelector('title');
      title = title ? title.text : '';

      if (title.indexOf('SiteVision Server editor') != -1) {
        return true;
      }

      // Online mode
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
}());
