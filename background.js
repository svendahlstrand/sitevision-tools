function onBeforeNavigate(details) {
  var newTabHost = details.url.replace(/^https?:\/\/([^\/]+)(.*)/, '$1');

  chrome.tabs.query({ title: 'SiteVision Server editor' }, function (tabs) {
    tabs.forEach(function (tab) {
      var host = tab.url.replace(/^https?:\/\/([^\/]+)(.*)/, '$1');

      if (tab.id != details.tabId && host == newTabHost) {
        chrome.tabs.remove(details.tabId);
        chrome.tabs.highlight({ tabs: tab.index }, function () {});
      }
    });
  });
}

function onMessage(message, sender, sendResponse) {
  chrome.pageAction.show(sender.tab.id);

  sendResponse({});
}

chrome.extension.onMessage.addListener(onMessage);
chrome.webNavigation.onBeforeNavigate.addListener(onBeforeNavigate, { url: [{ pathPrefix: '/editor' }] });