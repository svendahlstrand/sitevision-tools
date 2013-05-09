(function () {
  function QueryString() {
    this.raw = window.location.search;
  }

  QueryString.prototype.present = function() {
    return (this.raw.length > 0);
  };

  QueryString.prototype.includes = function(name) {
    re = '[?&]' + name;

    return (this.raw.search(re) != -1);
  };

  QueryString.prototype.get = function(name) {
    if (!this.includes(name)) { return null; }

    var re = '[?&]' + name + '=([^&]*)';

    return this.raw.match(re)[1];
  };

  QueryString.prototype.set = function(name, value) {
    /* Remove previously set parameter(s).
       TODO: Is this the best way? */
    var re = '[?&]' + name + '=([^&]*)';
    re = new RegExp(re, 'ig');

    this.raw = this.raw.replace(re, '');
    this.raw = this.raw.replace(/^&/, '?');

    var keyValuePair = name + '=' + value;
    var queryString = this.present() ? (this.raw + '&') : '?';

    this.raw = queryString + keyValuePair;
  };

  QueryString.prototype.reload = function() {
    window.location.search = this.raw;
  };

  var profiling = {
    queryString: new QueryString(),

    isProfilingActive: function() {
      var elements = document.getElementsByTagName('table');

      if (elements.length < 1) { return false; }

      var index = elements[0].textContent.search(/Profiling results/i);

      return (index != -1);
    },

    toggle: function() {
      this.queryString.set('profiling', !this.isProfilingActive());
      this.queryString.reload();
    }
  };

  profiling.toggle();
}());
