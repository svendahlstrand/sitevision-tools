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


function onBeforeRequest(details) {
  var websiteAlreadyOpenInTabId = tabUrlHandler.contains(details.url, details.tabId);

  if (websiteAlreadyOpenInTabId) {
    chrome.tabs.update(parseInt(websiteAlreadyOpenInTabId, 10), { active: true });
    return { redirectUrl: 'javascript: void 0' };
  }
}

function onMessage(message, sender, sendResponse) {
  chrome.pageAction.show(sender.tab.id);

  sendResponse({});
}

chrome.extension.onMessage.addListener(onMessage);
chrome.webRequest.onBeforeRequest.addListener(
  onBeforeRequest,
  { urls: ['*://*/editor*'], types: ['main_frame'] },
  ['blocking']);