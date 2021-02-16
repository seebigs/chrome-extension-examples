const state = {};

/**
 * Update the badge (text and color) for this extension's icon
 */
function updateBadge(score) {
    if (score < 33.33) {
        chrome.browserAction.setBadgeBackgroundColor({ color: '#8B0000' }); // red
    } else if (score < 66.66) {
        chrome.browserAction.setBadgeBackgroundColor({ color: '#D2691E' }); // orange
    } else {
        chrome.browserAction.setBadgeBackgroundColor({ color: '#008000' }); // green
    }
    chrome.browserAction.setBadgeText({
        text: `${score || ''}`,
    });
}

/**
 * Update the score to the one stored for this tab or clear it out
 */
function updateBadgeToStoredOrEmpty(tabId) {
    updateBadge(state[tabId]);
}

/**
 * Score has been sent from main page
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.namespace !== 'myScoreTracker') {
        return;
    }

    const data = request.data || {};
    if (request.eventName === 'score_update') {
        const score = parseInt(data.score, 10);
        if (score > 0) {
            state[sender.tab.id] = score;
            updateBadge(score);
        }
    }

    sendResponse();
});

/**
 * User navigated the page in the current tab
 */
chrome.tabs.onUpdated.addListener((tabId) => {
    state[tabId] = null;
    updateBadge('');
});

/**
 * User switched to a new tab
 */
chrome.tabs.onActivated.addListener((activeInfo) => {
    updateBadgeToStoredOrEmpty(activeInfo.tabId);
});

/**
 * User switched to a tab in a different window
 */
chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId > 0) {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab) {
                updateBadgeToStoredOrEmpty(activeTab.id);
            }
        });
    }
});
