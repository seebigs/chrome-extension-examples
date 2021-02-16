window.addEventListener('message', (msg) => {
    const event = msg.data;
    if (event.namespace === 'myScoreTracker') {
        chrome.runtime.sendMessage(event);
    }
});

function injectScript(url) {
    const s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', url);
    (document.getElementsByTagName('body')[0]).appendChild(s);
}

injectScript(chrome.extension.getURL('onpage.js'));
