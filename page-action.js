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

function toggleProfiling() {
  console.log('not implemented yet');

  window.close();
}

document.getElementById('editor').addEventListener('click', showEditor);
document.getElementById('profiling').addEventListener('click', toggleProfiling);