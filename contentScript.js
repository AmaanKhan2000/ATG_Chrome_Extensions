chrome.runtime.onMessage.addListener(
  function(request) {
    document.querySelector('h1').innerHTML = request;
  }
);