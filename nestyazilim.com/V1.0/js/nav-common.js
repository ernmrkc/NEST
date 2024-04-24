// Constants
const MAIN_TOP_OFFSET = 65;                 // top offset value of the main element for mobile views 
const LOGO_ASPECT_RATIO = 385 / 100;        // corporate logo default ratio (width / height)
const MIN_LOGO_HEIGHT = 55;                 // minimum height of the corporate logo for mobile views
const OFFSET_TOLERANCE_VALUE = 100;         // tolerance value

// UI Elements
const UIElementsNavbar = {
    footer: document.querySelector('footer'),
    corporateLogo: document.querySelector('#corporation_logo'),
    backgroundLogo: document.querySelector("#backgroundLogo"),
    navigationMenu: document.querySelector('nav'),
    mainContent: document.querySelector('main'),
    informationSection: document.querySelector('#information'),
    header: document.querySelector('header'),
    menuButton: document.querySelector('#menu-button'),
    formSubmitButton: document.querySelector('#submitButton'),
    userForm: document.querySelector('form'),
    scrollablePanel: document.querySelector('.scrollablePanel'),
    backgroundPanel: document.querySelector('.transparent_background'),
    floatingButton: document.querySelector('.floatingButton'),
    contactInformationSection: document.querySelector('#contactInformation'),
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
 * Toggle function of the hamburger menu button
 * 
 * @param {UIElements} elements    :     UIElements of the corresponding page
 */
function toggleNavigationMenu(elements) {
    const displayStyle = elements.navigationMenu.style.display;
    elements.navigationMenu.style.display = displayStyle === "flex" ? "none" : "flex";
}

/**
 * It resets the navbar to default when switching to mobile and PC views.
 * 
 * @param {UIElements} elements    :     UIElements of the corresponding page
 * @param {float} windowWidth      :     Window width
 */
function updateNavigationDisplay(elements, windowWidth) {
    elements.navigationMenu.style.display = windowWidth > 600 ? "flex" : "none";
}

/**
 * Adjusts the height of the Main Content area for the mobile and computer views
 * 
 * @param {UIElements} elements    :     UIElements of the corresponding page
 * @param {float} windowWidth      :     Window width
 * @param {float} windowHeight     :     Window height
 */
function adjustMainContentHeight(elements, windowWidth, windowHeight) {
    const height = windowWidth > 600 ? '100vh' : `${windowHeight - MAIN_TOP_OFFSET}px`;
    elements.mainContent.style.height = height;
}

/**
 * Adjusts the position of the backgroundPanel element for mobile and pc views.
 * 
 * @param {UIElements} elements    :     UIElements of the corresponding page
 * @param {float} windowWidth      :     Window width
 * @param {float} windowHeight     :     Window height
 */
function adjustBackgroundElement(elements, windowWidth, windowHeight) {
    const headerTopOffset = elements.header.offsetTop;
    const headerHeight = elements.header.offsetHeight;
    let offset = headerTopOffset + headerHeight + (windowHeight / 25);
    if (windowWidth < 600) {
        offset = elements.contactInformationSection ?
            elements.contactInformationSection.offsetTop + elements.contactInformationSection.offsetHeight :
            windowHeight / 25;
    }
    elements.backgroundPanel.style.top = `${offset}px`;
}

/**
 * Aligns the position of the backgroundLogo element according to the backgroundPanel element
 * 
 * @param {UIElements} elements    :     UIElements of the corresponding page
 * @param {float} windowWidth      :     Window width
 */
function adjustBackgroundLogo(elements, windowWidth) {
    const offset = elements.backgroundPanel.offsetTop;
    const backgroundHeight = elements.backgroundPanel.offsetHeight;
    elements.backgroundLogo.style.top = `${offset}px`;
    elements.backgroundLogo.style.width = `${windowWidth}px`;
    elements.backgroundLogo.style.height = `${backgroundHeight}px`;
}

/**
 * Sets the position of the footer element for mobile and pc views.
 * 
 * @param {UIElements} elements    :     UIElements of the corresponding page
 * @param {float} windowWidth      :     Window width
 */
function adjustFooter(elements, windowHeight) {
    const computedStyle = window.getComputedStyle(elements.floatingButton);
    const marginTop = parseInt(computedStyle.marginTop, 10);
    const paddingTop = parseInt(computedStyle.paddingTop, 10);
    const floatingButtonHeight = parseInt(computedStyle.height, 10);
    const floatingButtonTopOffset = (marginTop + paddingTop) * 2;
    const backgroundTopOffset = elements.backgroundPanel.offsetTop;
    const backgroundHeight = elements.backgroundPanel.offsetHeight;
    const informationSectionHeight = elements.informationSection.offsetHeight;

    let offset = OFFSET_TOLERANCE_VALUE + backgroundTopOffset + backgroundHeight + floatingButtonTopOffset + floatingButtonHeight + informationSectionHeight;
    elements.footer.style.top = (offset < windowHeight ? windowHeight : offset) + 'px';
}

/**
 * Adjusts the logo of the corporation according to window height
 * 
 * @param {UIElements} elements    :     UIElements of the corresponding page
 * @param {float} windowWidth      :     Window width
 */
function resizeCorporateLogo(elements, windowWidth) {
    const navHeight = windowWidth > 600 ? elements.navigationMenu.offsetHeight : MIN_LOGO_HEIGHT;
    elements.corporateLogo.style.height = `${navHeight}px`;
    elements.corporateLogo.style.width = `${navHeight * LOGO_ASPECT_RATIO}px`;
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
 * Initializes and refreshes the page by adjusting various UI elements based on the current window dimensions.
 * 
 * @param {UIElements} elements    :     UIElements of the corresponding page
 */
function initializeAndRefreshPage(UIElements) {
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    updateNavigationDisplay(UIElements, windowWidth);
    adjustMainContentHeight(UIElements, windowWidth, windowHeight);
    if (UIElements.userForm && UIElements.formSubmitButton) {
        centerSubmitButton(UIElements);
    }
    resizeCorporateLogo(UIElements, windowWidth);
    adjustBackgroundElement(UIElements, windowWidth, windowHeight);
    adjustBackgroundLogo(UIElements, windowWidth);
    adjustFooter(UIElements, windowHeight);
    resetScrollIfNeeded();
}

// Page Layout Update with Debounce
const debouncedRefreshPageSize = debounce(() => initializeAndRefreshPage(UIElementsNavbar), 250);

// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
    initializeAndRefreshPage(UIElementsNavbar);
    UIElementsNavbar.menuButton.addEventListener('click', () => toggleNavigationMenu(UIElementsNavbar));
});

window.addEventListener('resize', () => debouncedRefreshPageSize(UIElementsNavbar));