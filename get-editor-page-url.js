(function () {
  return document.querySelector('frame[name="SiteVisionEditor"]').src.match(/(.+)\?/)[1];
}());