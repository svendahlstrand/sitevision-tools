(function () {
  var tabUrlHandler = (function() {
    var editorHosts = {},

    queryTabsCallback = function(allTabs) {
      allTabs.forEach(function(tab) {
        updateTabCallback(tab.id, null, tab);
      });
    },

    updateTabCallback = function(tabId, changeinfo, tab) {
      if (changeinfo && changeinfo.status === 'complete') { return; }

      var match = tab.url.match(/^https?:\/\/([^\/]+)\/editor(?!\/admin)/);

      editorHosts[tabId] = match && match[1];
    },

    removeTabCallback = function(tabId, removeinfo) {
      delete editorHosts[tabId];
    },

    init = function() {
      chrome.tabs.query({}, queryTabsCallback);
    };

    chrome.runtime.onInstalled.addListener(init);
    chrome.runtime.onStartup.addListener(init);
    chrome.tabs.onUpdated.addListener(updateTabCallback);
    chrome.tabs.onRemoved.addListener(removeTabCallback);

    return {
      contains: function(url, currentTabId) {
        var host = url.replace(/^https?:\/\/([^\/]+)(.*)/, '$1');
        for (var tabId in editorHosts) {
          if (tabId != currentTabId && editorHosts[tabId] == host) {
            return parseInt(tabId, 10);
          }
        }

        return false;
      }
    };
  }());

  function switchToOpenEditor(details) {
    var isNotAdminTools = details.url.indexOf('editor/admin') == -1;
    var openEditorTabId = tabUrlHandler.contains(details.url, details.tabId);

    if (isNotAdminTools && openEditorTabId) {
      chrome.tabs.get(openEditorTabId, function (tab) {
        chrome.tabs.update(tab.id, { active: true });
        chrome.windows.update(tab.windowId, { focused: true });
      });

      return { redirectUrl: 'javascript: void 0' };
    }
  }

  chrome.webRequest.onBeforeRequest.addListener(
    switchToOpenEditor,
    { urls: ['*://*/editor*'], types: ['main_frame'] },
    ['blocking']);
}());
