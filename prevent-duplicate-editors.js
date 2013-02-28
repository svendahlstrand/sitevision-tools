(function () {
  var tabUrlHandler = (function() {
    var urls = {},

    queryTabsCallback = function(allTabs) {
      allTabs.forEach(function(tab) {
        updateTabCallback(tab.id, null, tab);
      });
    },

    updateTabCallback = function(tabId, changeinfo, tab) {
      urls[tabId] = tab.url.replace(/^https?:\/\/([^\/]+)(.*)/, '$1');;
    },

    removeTabCallback = function(tabId, removeinfo) {
      delete urls[tabId];
    };

    init = function() {
      chrome.tabs.query({}, queryTabsCallback);
    };

    chrome.runtime.onInstalled.addListener(init);
    chrome.runtime.onStartup.addListener(init);
    chrome.tabs.onUpdated.addListener(updateTabCallback);
    chrome.tabs.onRemoved.addListener(removeTabCallback);

    return {
      contains: function(url, tabId) {
        var host = url.replace(/^https?:\/\/([^\/]+)(.*)/, '$1');
        for (var urlId in urls) {
          if (urlId != tabId && urls[urlId] == host) {
            return urlId;
          }
        }

        return false;
      }
    };
  }());

  function switchToOpenEditor(details) {
    var openEditorTabId = tabUrlHandler.contains(details.url, details.tabId);

    if (openEditorTabId) {
      chrome.tabs.update(parseInt(openEditorTabId, 10), { active: true });
      return { redirectUrl: 'javascript: void 0' };
    }
  }

  chrome.webRequest.onBeforeRequest.addListener(
    switchToOpenEditor,
    { urls: ['*://*/editor*'], types: ['main_frame'] },
    ['blocking']);
}());