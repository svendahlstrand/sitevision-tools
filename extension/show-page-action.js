(function () {
  function showPageAction(message, sender, sendResponse) {
    chrome.pageAction.show(sender.tab.id);
  }

  chrome.extension.onMessage.addListener(showPageAction);
}());
