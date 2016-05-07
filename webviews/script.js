window.onerror = function(err) {
  if (window.WebViewBridge) {
    window.WebViewBridge.send(JSON.stringify({ error: err.stack || err }));
  } else {
    console.error(err);
  }
}

function webViewBridgeReady(cb) {
  if (window.WebViewBridge) {
    cb(window.WebViewBridge);
    return;
  }

  function handler() {
    document.removeEventListener('WebViewBridge', handler, false);
    cb(window.WebViewBridge);
  }
  document.addEventListener('WebViewBridge', handler, false);
}

function parseFromBridge(message) {
  return JSON.parse(message.replace(/__@@__/g, `'`));
}

webViewBridgeReady(function (webViewBridge) {
  webViewBridge.onMessage = function (msg) {
    const message = parseFromBridge(msg);
    document.getElementById('message').innerText = message.text;
    setTimeout(function() {
      webViewBridge.send(JSON.stringify({ text: 'Hello From WebView' }));
    }, 2000);
  };
});
