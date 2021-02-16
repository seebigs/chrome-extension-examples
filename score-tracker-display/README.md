# Score Tracker Display

## Test it for yourself
1. Install the extention: [v2](v2) | [v3](v3)
2. If you don't see this extension's icon beside your address bar, "pin" it so it always appears
3. Load a webpage that runs the example code below (or paste it into the dev console after loading):
```js
window.myScoreTracker = window.myScoreTracker || [];
window.myScoreTracker.push(27); // Any number 1-100
```

> Browse around and notice how the displayed score applies only to the current page load. It gets reset when you navigate away or switch tabs.
