(function () {

  function onFileChange(event) {
    let reader = new FileReader();
    reader.onload = onFileReaderLoad;
    reader.readAsText(event.target.files[0]);
  }

  function onFileReaderLoad(event) {
    let obj = JSON.parse(event.target.result);
    if (Array.isArray(obj) && obj.length > 0 && obj[0].replaceString) {
      chrome.storage.sync.set({
        'rules': obj
      }, () => { location.reload(); });
    }
  }

  document.getElementById('file').addEventListener('change', onFileChange);
  document.getElementById('btn-import').addEventListener('click', () => document.getElementById('file').click());
  document.getElementById('btn-export').addEventListener('click',
    () => {
      chrome.storage.sync.get('rules', function (data) {
        if (typeof data.rules !== 'undefined') {
          saveFile(JSON.stringify(data.rules), 'replace-as-you-type.json');
        }
      });
    });

  function saveFile(text, filename = "download.txt") {
    var link = document.createElement('a');
    link.href = 'data:text/plain;charset=UTF-8,' + text;
    link.download = filename;
    link.click();
  }
}());
