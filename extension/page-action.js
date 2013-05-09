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

  function toggleProfiling() {
    chrome.tabs.executeScript({ file: 'toggle-profiling.js' });

    window.close();
  }

  function adminTools() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var tab = tabs[0];
      var editorUrl = tab.url.replace(/^(https?:\/\/[^\/]+)(.*)/, '$1/editor/admin/index.html');

      chrome.tabs.update(tab.id, {
        url: editorUrl
      });
    });

    window.close();
  }

  function initializeButton(id, message, callback) {
    var button = document.getElementById(id);

    button.innerText = chrome.i18n.getMessage(message);
    button.addEventListener('click', callback);
  }

  initializeButton('editor', 'login', showEditor);
  initializeButton('open-editor-page-in-new-tab', 'open_in_new_tab', gedEditorPageUrl);
  initializeButton('profiling', 'profiling', toggleProfiling);
  initializeButton('admin-tools', 'admin_tools', adminTools);
}());
