(() => {

    function handlePushedScore(score) {
        window.postMessage({
            namespace: 'myScoreTracker',
            eventName: 'score_update',
            data: {
                score,
            },
        });
    }

    let pushedScore;
    if (Array.isArray(window.myScoreTracker)) {
        [pushedScore] = window.myScoreTracker;
    }

    window.myScoreTracker = {
        push: handlePushedScore,
    };

    if (pushedScore) {
        handlePushedScore(pushedScore);
    }

})();
