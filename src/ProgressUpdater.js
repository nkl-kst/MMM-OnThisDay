/**
 * Updates the progress bar immediately when it is created.
 */

function updateProgress(mutations) {
    // Find mutations in this module
    const moduleMutations = [];
    mutations.forEach(function (mutation) {
        if (mutation.target.parentNode.classList.contains('MMM-OnThisDay')) {
            moduleMutations.push(mutation);
        }
    });

    // Do nothing if mutations are not in this module
    if (moduleMutations.length <= 0) {
        return;
    }

    // Find progress bar
    const progress = document.getElementById('mmm-otd-carousel-progress');
    if (!progress) {
        return;
    }

    // Update progress
    progress.value = 1;
}

const observer = new MutationObserver(updateProgress);
observer.observe(document, { subtree: true, childList: true });
