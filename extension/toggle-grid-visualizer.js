(function () {
  function addOutline(element, color) {
    element.style.outline = '2px solid ' + color;
  }

  function removeOutline(element) {
    element.style.outline = '';
  }

  function isOutlined(element) {
    return element.style.outline !== '';
  }

  function GridVisualizer() {
    this.grids = document.querySelectorAll('.sv-fixed-fluid-grid, .sv-fluid-grid, .sv-fixed-grid');
    this.rows = document.querySelectorAll('.sv-row');
    this.columns = document.querySelectorAll('*[class*="sv-column-"]');
  }

  GridVisualizer.prototype.toggle = function(nodeList, color) {
    var toggler,
      i = 0,
      length = nodeList.length;

    if (!length) { return; }

    // If the element is outlined then we want to call removeOutline otherwise addOutline
    toggler = isOutlined(nodeList[0]) ? removeOutline : addOutline;

    for ( ; i < length; i++) {
      toggler(nodeList[i], color);
    }
  };

  GridVisualizer.prototype.toggleGrids = function() {
    this.toggle(this.grids, 'black');
  };

  GridVisualizer.prototype.toggleRows = function() {
    this.toggle(this.rows, 'red');
  };

  GridVisualizer.prototype.toggleColumns = function() {
    this.toggle(this.columns, 'red');
  };

  GridVisualizer.prototype.toggleAll = function() {
    this.toggleGrids();
    this.toggleRows();
    this.toggleColumns();
  };

  var gridVisualizer = new GridVisualizer();
  gridVisualizer.toggleAll();
}());
