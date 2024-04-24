// Constants
const LOGO_ASPECT_RATIO = 385 / 100;                    // corporate logo default ratio (width / height)
const MIN_WINDOW_HEIGHT_FOR_SMALL_SCREEN = 660;         // minimum window height for mobile screen
const MIN_WINDOW_HEIGHT_FOR_LARGE_SCREEN = 970;         // minimum window height for pc screen
const FOOTER_OFFSET_FOR_SMALL_SCREEN = 740;             // footer offset value for mobile screen
const FOOTER_OFFSET_FOR_LARGE_SCREEN = 80;              // footer offset value for pc screen
const OFFSET_TOLERANCE_VALUE = 100;                     // tolerance value
const MIN_LOGO_HEIGHT = 55;                             // minimum height of the corporate logo for mobile views

// UI Elements
const UIElementsSectors = {
    footer: document.querySelector('footer'),
    sectorBackground: document.querySelector('.sectorBackgroundImage'),
    sectorTitle: document.querySelector('#sectorTitle'),
    corporateLogo: document.querySelector('#corporation_logo'),
    closePanel: document.querySelector('#closeButton')
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
 * The close button function redirects to the home page.
 */
function redirectToHomePage() {
    window.location.href = 'index';
}

/**
 * Resizes the corporate logo to match the height of the sector title and adjusts its width based on a predefined aspect ratio.
 * 
 * @param {UIElements} elements    :     UIElements of the corresponding page
 */
function resizeCorporateLogoToTitle(UIElements, windowWidth) {
    const titleHeight = UIElements.sectorTitle.offsetHeight;
    if(windowWidth < 600)
    {
        UIElements.corporateLogo.style.height = `${MIN_LOGO_HEIGHT}px`;
        UIElements.corporateLogo.style.width = `${MIN_LOGO_HEIGHT * LOGO_ASPECT_RATIO}px`;
    }
    else
    {
        UIElements.corporateLogo.style.height = `${titleHeight}px`;
        UIElements.corporateLogo.style.width = `${titleHeight * LOGO_ASPECT_RATIO}px`;
    }
    
}

/**
 * This function sets the position of the footer and the height of the background element according to the current window dimensions.
 *
 * @param {UIElements} elements    :     UIElements of the corresponding page
 * @param {float} windowWidth      :     Window width
 * @param {float} windowHeight     :     Window height
 */
function adjustFooterAndBackgroundForWindowSize(UIElements, windowWidth, windowHeight) {
    let footerTop, bgHeight;
    if (windowWidth > 600) {
        footerTop = windowHeight < MIN_WINDOW_HEIGHT_FOR_SMALL_SCREEN ? FOOTER_OFFSET_FOR_SMALL_SCREEN : windowHeight + FOOTER_OFFSET_FOR_LARGE_SCREEN;
        bgHeight = windowHeight < MIN_WINDOW_HEIGHT_FOR_SMALL_SCREEN ? footerTop + 20 : windowHeight + OFFSET_TOLERANCE_VALUE;
    } else {
        footerTop = windowHeight < MIN_WINDOW_HEIGHT_FOR_LARGE_SCREEN ? MIN_WINDOW_HEIGHT_FOR_LARGE_SCREEN : windowHeight - 20;
        bgHeight = windowHeight < MIN_WINDOW_HEIGHT_FOR_LARGE_SCREEN ? footerTop + 20 : windowHeight + OFFSET_TOLERANCE_VALUE;
    }
    UIElements.footer.style.top = `${footerTop}px`;
    UIElements.sectorBackground.style.height = `${bgHeight}px`;
}

/**
 * Scrolls the page to the top if the HTML overflow-y property is set to 'hidden'.
 */
function resetScrollIfNeeded() {
    const htmlStyle = window.getComputedStyle(document.documentElement);
    const htmlOverflowY = htmlStyle.overflowY;
    if(htmlOverflowY === 'hidden'){
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
    resizeCorporateLogoToTitle(UIElements, windowWidth);
    adjustFooterAndBackgroundForWindowSize(UIElements, windowWidth, windowHeight);
    resetScrollIfNeeded();
}

// Event Listeners
const debouncedRefreshPageSize = debounce(() => initializeAndRefreshPage(UIElementsSectors), 250);

window.addEventListener('DOMContentLoaded', () => {
    initializeAndRefreshPage(UIElementsSectors);
    UIElementsSectors.closePanel.addEventListener('click', redirectToHomePage);
});
window.addEventListener('resize', () => debouncedRefreshPageSize(UIElementsSectors));
