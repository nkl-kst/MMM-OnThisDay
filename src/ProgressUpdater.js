/**
 * Updates the progress bar every 1s.
 */

function updateProgress() {
    const progress = document.getElementById('mmm-otd-carousel-progress');
    if (!progress) {
        return;
    }

    if (progress.value >= progress.max) {
        return;
    }

    ++progress.value;
}

(function scheduleUpdate() {
    setTimeout(() => {
        updateProgress();
        scheduleUpdate();
    }, 1000);
})();
