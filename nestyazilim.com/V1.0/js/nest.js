// Constants
const LOGO_ASPECT_RATIO = 385 / 100;                // corporate logo default ratio (width / height)
const MIN_LOGO_HEIGHT = 55;                         // minimum height of the corporate logo for mobile views
const currentLang = document.documentElement.lang;
let currentIndex = 0;
let sliderMoveRatio = 60;
let sliderOffset = 40;

// Elements
const UIElementsNest = {
    sectorElements: document.querySelectorAll('.slide_sectors'),
    header: document.querySelector('header'),
    mainContent: document.querySelector('main'),
    footer: document.querySelector('footer'),
    navigationMenu: document.querySelector('nav'),
    welcomeLogo: document.querySelector('#WelcomeLogo'),
    corporateLogo: document.querySelector('#corporation_logo'),
    menuButton: document.querySelector('#menu-button'),
    isAnimationEnabled: sessionStorage.getItem("animation")
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
    return function (...args) {
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
 * Initializes the animation settings for various UI elements based on the provided animation flag. 
 * If animations are enabled it sets the welcome logo to be immediately visible without animation and
 * removes any animation delays from the header, main content, footer, and sector elements.
 * This ensures that all relevant elements are visible and not subject to animation delays, providing immediate access to content.
 * 
 * @param {UIElements} elements    :     UIElements of the corresponding page
 */
function initializeAnimationSettings(elements) {
    if (elements.isAnimationEnabled === 'true') {
        Object.assign(elements.welcomeLogo.style, {
            animation: 'none',
            visibility: 'visible'
        });
        ['header', 'mainContent', 'footer'].forEach(part => {
            Object.assign(elements[part].style, {
                animationDelay: '0s',
                visibility: 'visible'
            });
        });
        elements.sectorElements.forEach(el => el.style.animationDelay = '0s');
    }
}

/**
 * Handles the end of an animation sequence by setting the visibility of the header, main content, and footer elements to visible.
 * It also updates the session storage to indicate that the animation has finished.
 *
 * @param {UIElements} elements    :     UIElements of the corresponding page
 */
function handleAnimationEnd(elements) {
    ['header', 'mainContent', 'footer'].forEach(part => elements[part].style.visibility = 'visible');
    sessionStorage.setItem("animation", true);
}

/**
 * Initializes and refreshes the page by adjusting various UI elements based on the current window dimensions.
 * 
 * @param {UIElements} elements    :     UIElements of the corresponding page
 */
function updatePageLayoutOnResize(elements) {
    const windowWidth = document.documentElement.clientWidth;
    updateNavigationDisplay(elements, windowWidth);
    resizeCorporateLogo(elements, windowWidth);
    resetScrollIfNeeded();
}

function cloneSliderItems() {
    const carousel = document.querySelector('.carousel-slider');
    const firstItem = carousel.children[0].cloneNode(true);
    const lastItem = carousel.children[carousel.children.length - 1].cloneNode(true);

    carousel.insertBefore(lastItem, carousel.firstChild);
    carousel.appendChild(firstItem);
}

function moveToNextItem() {
    const carousel = document.querySelector('.carousel-slider');
    const totalItems = carousel.children.length;
    currentIndex = (currentIndex + 1) % totalItems;
    carousel.style.transform = `translateX(-${(currentIndex * sliderMoveRatio) + sliderOffset}%)`;
    if (currentIndex === totalItems - 1) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentIndex = 1;
            carousel.style.transform = `translateX(-${(currentIndex * sliderMoveRatio) + sliderOffset}%)`;
        }, 500);
    } else {
        carousel.style.transition = 'transform 0.5s ease';
    }
}

function moveToPreviousItem() {
    const carousel = document.querySelector('.carousel-slider');
    const totalItems = carousel.children.length;
    currentIndex = currentIndex === 0 ? totalItems - 2 : currentIndex - 1;
    carousel.style.transform = `translateX(-${(currentIndex * sliderMoveRatio) + sliderOffset}%)`;
    if (currentIndex === 0) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentIndex = totalItems - 2;
            carousel.style.transform = `translateX(-${(currentIndex * sliderMoveRatio) + sliderOffset}%)`;
        }, 500);
    } else {
        carousel.style.transition = 'transform 0.5s ease';
    }
}

function pcListeners() {
    UIElementsNest.sectorElements.forEach(sector => {
        sector.addEventListener('click', () => {
            const sectorID = sector.id;
            if (currentLang === 'tr') {
                switch (sectorID) {
                    case 'game-entertainment':
                        window.location.href = '/tr/oyun-eglence';
                        break;
                    case 'embedded-systems':
                        window.location.href = '/tr/gomulu-sistemler';
                        break;
                    case 'artificial-intelligence':
                        window.location.href = '/tr/yapay-zeka';
                        break;
                    case 'ar-vr-technologies':
                        window.location.href = '/tr/simulasyon-sistemleri';
                        break;
                    case 'application_development':
                        window.location.href = '/tr/uygulama-gelistirme';
                        break;
                    default:
                }
            }
            else {
                switch (sectorID) {
                    case 'game-entertainment':
                        window.location.href = '/en/game-entertainment';
                        break;
                    case 'embedded-systems':
                        window.location.href = '/en/embedded-systems';
                        break;
                    case 'artificial-intelligence':
                        window.location.href = '/en/artificial-intelligence';
                        break;
                    case 'ar-vr-technologies':
                        window.location.href = '/en/ar-vr-technologies';
                        break;
                    case 'application_development':
                        window.location.href = '/en/application-development';
                        break;
                }
            }
        });
    });
}

function mobileListeners() {
    cloneSliderItems();
    const featuredImage = document.querySelector('.featured-sector .featured-image');
    const sectorName = document.getElementById('sectorName');
    const contactButton = document.querySelector('#contactButton');

    document.querySelectorAll('.carousel-item img').forEach(item => {
        item.addEventListener('click', function () {
            featuredImage.src = this.src;
            featuredImage.alt = this.alt;
            switch (this.alt) {
                case 'oyun-eğlence':
                    sectorName.src = "/images/slider-texts-tr/oyun-eğlence.webp";
                    break;
                case 'game-entertainment':
                    sectorName.src = "/images/slider-texts-en/game-entertainment.webp";
                    break
                case 'yapay-zeka':
                    sectorName.src = "/images/slider-texts-tr/yapay-zeka.webp";
                    break
                case 'artificial-intelligence':
                    sectorName.src = "/images/slider-texts-en/artificial-intelligence.webp";
                    break
                case 'ar-vr-teknolojileri':
                    sectorName.src = "/images/slider-texts-tr/ar-vr-teknolojileri.webp";
                    break
                case 'ar-vr-technologies':
                    sectorName.src = "/images/slider-texts-en/ar-vr-technologies.webp";
                    break
                case 'uygulama-geliştirme':
                    sectorName.src = "/images/slider-texts-tr/uygulama-geliştirme.webp";
                    break
                case 'application-development':
                    sectorName.src = "/images/slider-texts-en/application-development.webp";
                    break
                case 'gömülü-sistemler':
                    sectorName.src = "/images/slider-texts-tr/gömülü-sistemler.webp";
                    break
                case 'embedded-systems':
                    sectorName.src = "/images/slider-texts-en/embedded-systems.webp";
                    break
                default:
                    break;
            }
        });
    });

    document.getElementById('nextButton').addEventListener('click', moveToNextItem);
    document.getElementById('prevButton').addEventListener('click', moveToPreviousItem);

    contactButton.addEventListener('click', () => {
        switch (featuredImage.alt) {
            case 'oyun-eğlence':
                contactButton.href = '/tr/oyun-eglence';
                break;
            case 'game-entertainment':
                contactButton.href = '/en/game-entertainment';
                break;
            case 'yapay-zeka':
                contactButton.href = '/tr/yapay-zeka';
                break;
            case 'artificial-intelligence':
                contactButton.href = '/en/artificial-intelligence';
                break;
            case 'ar-vr-teknolojileri':
                contactButton.href = '/tr/simulasyon-sistemleri';
                break;
            case 'ar-vr-technologies':
                contactButton.href = '/en/ar-vr-technologies';
                break;
            case 'uygulama-geliştirme':
                contactButton.href = '/tr/uygulama-gelistirme';
                break;
            case 'application-development':
                contactButton.href = '/en/application-development';
                break;
            case 'gömülü-sistemler':
                contactButton.href = '/tr/gomulu-sistemler';
                break;
            case 'embedded-systems':
                contactButton.href = '/en/embedded-systems';
                break;
            default:
                break;
        }
    });
}

const debouncedRefreshPageSize = debounce(() => updatePageLayoutOnResize(UIElementsNest), 250);

// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
    UIElementsNest.welcomeLogo.addEventListener("animationend", () => handleAnimationEnd(UIElementsNest));
    UIElementsNest.menuButton.addEventListener('click', () => toggleNavigationMenu(UIElementsNest));
    initializeAnimationSettings(UIElementsNest);
    pcListeners();
    mobileListeners();
    debouncedRefreshPageSize();
});

window.addEventListener('resize', () => debouncedRefreshPageSize(UIElementsNest));