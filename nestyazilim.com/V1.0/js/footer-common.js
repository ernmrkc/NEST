// Constants
const OFFSET_TOLERANCE_VALUE = 100;     // tolerance value 

// UI Elements
const UIElementsFooter = {
    footer: document.querySelector('footer'),
    closePanel: document.getElementById('closeButton'),
    formSubmitButton: document.querySelector('#submitButton'),
    userForm: document.querySelector('form'),
    backgroundPanel: document.querySelector('.transparent_background'),
    titleElement: document.querySelector('#PrivacyPolicyTitle'),
    loadingSpinner: document.querySelector('.loading-spinner')
};

/**
 * Creates a debounced function that delays invoking the provided function until at least `wait` milliseconds have elapsed
 * since the last time the debounced function was invoked.
 * 
 * @param {Function} func       :        The function to debounce.
 * @param {number} wait         :        The number of milliseconds to delay.
 * @returns {Function}          :        A new debounced version of the given function.
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Sets the position of the footer element for mobile and pc views.
 * 
 * @param {UIElements} elements    :     UIElements of the corresponding page
 * @param {float} windowWidth      :     Window width
 */
function adjustFooter(elements, windowHeight) {
    const backgroundOffsetTop = elements.backgroundPanel.offsetTop;
    const backgroundHeight = elements.backgroundPanel.offsetHeight;
    let offset = OFFSET_TOLERANCE_VALUE + backgroundOffsetTop + backgroundHeight;
    if (elements.titleElement) {
        // privacy policy
        offset += elements.titleElement.offsetTop + elements.titleElement.offsetHeight;
    }
    // Adjust footer for small screens or when offset is less than the window height
    if (windowHeight <= 780) {
        elements.footer.style.top = (offset < windowHeight ? windowHeight : offset) + 'px';
    }
}

/**
 * Sets the submit button and spinner element right in the middle of the form.
 * 
 * @param {UIElements} elements    :     UIElements of the corresponding page
 */
function centerSubmitButton(elements) {
    const offsetButton = (elements.userForm.offsetWidth - elements.formSubmitButton.offsetWidth) / 2;
    const offsetSpinner = (offsetButton + elements.formSubmitButton.offsetWidth + 20);
    elements.formSubmitButton.style.left = `${offsetButton}px`;
    elements.loadingSpinner.style.left = `${offsetSpinner}px`
}

/**
 * The close button function redirects to the home page.
 */
function redirectToHomePage() {
    window.location.href = 'index';
}

/**
 * Scrolls the page to the top if the HTML overflow-y property is set to 'hidden'.
 */
function resetScrollIfNeeded() {
    const htmlStyle = window.getComputedStyle(document.documentElement);
    const htmlOverflowY = htmlStyle.overflowY;
    if (htmlOverflowY === 'hidden') {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
}

/**
 * Initializes and refreshes the page by adjusting various UI elements based on the current window dimensions.
 * 
 * @param {UIElements} elements    :     UIElements of the corresponding page
 */
function initializeAndRefreshPage(UIElements) {
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    if (UIElements.userForm && UIElements.formSubmitButton) {
        centerSubmitButton(UIElements);
    }
    adjustFooter(UIElements, windowHeight, windowWidth);
    resetScrollIfNeeded();
}

// Page Layout Update with Debounce
const debouncedRefreshPageSize = debounce(() => initializeAndRefreshPage(UIElementsFooter), 250);

window.addEventListener('DOMContentLoaded', () => {
    initializeAndRefreshPage(UIElementsFooter);
    UIElementsFooter.closePanel.addEventListener('click', redirectToHomePage);
});
window.addEventListener('resize', () => debouncedRefreshPageSize(UIElementsFooter));