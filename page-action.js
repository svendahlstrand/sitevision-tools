(function () {
  function showEditor() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var tab = tabs[0];
      var editorUrl = tab.url.replace(/^(https?:\/\/[^\/]+)(.*)/, '$1/editor');

      chrome.tabs.update(tab.id, {
        url: editorUrl
      });
    });

    window.close();
  }

  function gedEditorPageUrl() {
    chrome.tabs.executeScript({ file: 'get-editor-page-url.js' }, function (result) {
      var url = result[0];

      if (url) {
        chrome.tabs.create({ url: url });
      }
    });

    window.close();
  }

  document.getElementById('editor').addEventListener('click', showEditor);
  document.getElementById('open-editor-page-in-new-tab').addEventListener('click', gedEditorPageUrl);
}());