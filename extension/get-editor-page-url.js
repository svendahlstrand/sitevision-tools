(function () {
  var location = document.querySelector('frame[name="SiteVisionEditor"]').contentWindow.location;

  return [location.protocol, '//', location.host, location.pathname].join('');
}());