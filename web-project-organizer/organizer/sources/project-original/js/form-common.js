/**
 * Creates an object containing references to the form elements based on the specified base ID.
 * 
 * @param {string} baseId           :           The base identifier used to construct unique selectors for form elements.
 *                                              E.g. 'career', 'contact', or 'support'.
 * @returns {object}                :           An object that contains references to form elements. 
 *                                              Undefined elements are set for those that do not apply to the specific form type.
 */
function createFormElements(baseId) {
    return {
        loadingSpinner: document.querySelector(".loading-spinner"),
        buttonSubmit: document.querySelector('#submitButton'),
        inputUserName: document.querySelector(`#${baseId}UserNameInput`),
        inputUserPhone: document.querySelector(`#${baseId}UserPhoneInput`),
        labelUserPhone: baseId === 'career' || baseId === 'contact' ? document.querySelector(`#${baseId}UserPhoneLabel`) : undefined,
        inputUserEmail: document.querySelector(`#${baseId}UserEmailInput`),
        labelUserEmail: document.querySelector(`#${baseId}UserEmailLabel`),
        inputApplicationDepartment: baseId === 'career' ? document.querySelector(`#${baseId}ApplicationDepartmentInput`) : undefined,
        inputFile_Cv: baseId === 'career' ? document.querySelector(`#${baseId}CvInput`) : undefined,
        inputFile_CoverLetter: baseId === 'career' ? document.querySelector(`#${baseId}CoverLetterInput`) : undefined,
        downloadLink_Cv: baseId === 'career' ? document.querySelector(`#${baseId}CvDownload`) : undefined,
        downloadLink_CoverLetter: baseId === 'career' ? document.querySelector(`#${baseId}CoverLetterDownload`) : undefined,
        inputUserCompany: baseId === 'contact' ? document.querySelector(`#${baseId}UserCompanyInput`) : undefined,
        inputSubject: baseId === 'contact' || baseId === 'support' ? document.querySelector(`#${baseId}SubjectInput`) : undefined,
        inputExplanation: baseId === 'contact' || baseId === 'support' ? document.querySelector(`#${baseId}ExplanationInput`) : undefined,
        inputUserMessageType: baseId === 'support' ? document.querySelector(`#${baseId}UserMessageTypeInput`) : undefined
    };
}

const pageName = getPageName();

// Create FormElements Objects
const FormElementsCareer = createFormElements('career');
const FormElementsContact = createFormElements('contact');
const FormElementsSupport = createFormElements('support');

/********************************************************
 *                  Helper Functions                    *
 ********************************************************/

/**
 * Returns the name of the current page
 * 
 * @returns             :           Page name
 */
function getPageName() {
    var pathname = window.location.pathname;
    return pathname.substring(pathname.lastIndexOf("/") + 1).split('.')[0];
}

/**
 * Updates the style of the provided label element with new top, left, color, and font size values.
 * 
 * @param {HTMLElement} label           :            The label element to update.
 * @param {string} top                  :            The top position value
 * @param {string} left                 :            The left position value
 * @param {string} color                :            The color value
 * @param {string} fontSize             :            The font size value
 */
function updateLabelStyle(label, top, left, color, fontSize) {
    label.style.top = top;
    label.style.left = left;
    label.style.color = color;
    label.style.fontSize = fontSize;
}

/********************************************************
 *          Functions to handle phone number            *
 ********************************************************/

/**
 * Formats a string of digits into a standardized phone number format. The function formats
 * up to the first 10 digits of the input string into the pattern "(xxx) xxx xx xx", adding
 * parentheses and spaces at the appropriate positions. It's designed to handle user input in
 * real-time, providing formatted feedback as the user types a phone number.
 *
 * @param {string} numbers          :            A string containing the digits of the phone number to be formatted.
 *                                               This string should contain only numeric characters.
 * @returns {string}                :            The formatted phone number in the pattern "(xxx) xxx xx xx". If fewer than
 *                                               10 digits are provided, the function will format as much as possible.
 */
function formatPhoneNumber(numbers) {
    let formatted = '';
    for (let i = 0; i < numbers.length && i < 10; i++) {
        switch (i) {
            case 0:
                formatted += '(';
                break;
            case 3:
                formatted += ') ';
                break;
            case 6:
                formatted += ' ';
                break;
            case 8:
                formatted += ' ';
                break;
        }
        formatted += numbers[i];
    }
    return formatted;
}

/**
 * Updates the style of a phone input field based on the validity of its length.
 * 
 * It checks if the phone number contains the expected number of digits (10 in this case).
 * 
 * If the number is of the expected length, it sets the text color to white; otherwise, it sets the text color to red.
 * 
 * @param {*HTMLInputElement} phoneInput            :           The phone input DOM element whose validity is to be updated.
 * @param {*HTMLInputElement} phoneLabel            :           The phone label DOM element whose validty is to be updated.
 */
function updateInputValidity(phoneInput, phoneLabel) {
    var numbers = phoneInput.value.replace(/[^\d]/g, '');
    var isNotEmpty = phoneInput.value.trim() !== '';
    phoneInput.style.color = numbers.length === 10 ? 'white' : '#ca3b3b';

    if (isNotEmpty) {
        updateLabelStyle(phoneLabel, '-25px', '5px', 'var(--effect-color)', 'var(--form-font-size-focus)');
    }
    else {
        updateLabelStyle(phoneLabel, '0px', '0px', 'white', 'var(--form-font-size)');
    }
}

/**
 * Checks if a given key is considered a special navigation key.
 * 
 * Special keys include arrow keys, End, and Home, which are typically used for navigation purposes within inputs.
 *
 * @param {string} key          :           The key string to check. This is usually provided by keyboard event listeners.
 * @returns {boolean}                       Returns true if the key is one of the special navigation keys; otherwise, returns false.
 */
function isSpecialKey(key) {
    return ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'End', 'Home'].includes(key);
}


/**
 * Handles the 'keydown' event for a phone input field. 
 * 
 * It ensures that the input is formatted as a phone number, prevents non-numeric input, and handles special keys for navigation.
 * 
 * It also updates the input field with the formatted phone number and adjusts the text color based on the input's validity.
 *
 * @param {KeyboardEvent} e                         :           The KeyboardEvent object associated with the 'keydown' event.
 * @param {*HTMLInputElement} phoneInput            :           The phone input DOM element whose validity is to be updated.
 * @param {*HTMLInputElement} phoneLabel            :           The phone label DOM element whose validty is to be updated.
 */
function handleKeyDownEvent(e, phoneInput, phoneLabel) {
    var key = e.key;
    var numbers = phoneInput.value.replace(/[^\d]/g, '');

    // Ensure the cursor is always at the end of the input
    if (phoneInput.selectionStart < phoneInput.value.length) {
        phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
    }

    // Handle special keys and numeric input
    if (isSpecialKey(key)) {
        e.preventDefault();
    } else if (key === 'Backspace' && numbers.length > 0) {
        e.preventDefault();
        numbers = numbers.substring(0, numbers.length - 1);
        phoneInput.value = formatPhoneNumber(numbers);
    } else if (!key.match(/[0-9]/)) {
        e.preventDefault();
    } else if (key.match(/[0-9]/)) {
        e.preventDefault();
        phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
        numbers += key;
        phoneInput.value = formatPhoneNumber(numbers);
    }

    // Update the style of the input based on the validity of its length
    updateInputValidity(phoneInput, phoneLabel);
}

/**
 * This function is designed to format the entered numbers as a phone number, 
 * set the cursor position to the end of the input, and update the input's validity styling.
 *
 * @param {*HTMLInputElement} phoneInput            :           The phone input DOM element whose validity is to be updated.
 * @param {*HTMLInputElement} phoneLabel            :           The phone label DOM element whose validty is to be updated.
 */
function handleInputEvent(phoneInput, phoneLabel) {
    var numbers = phoneInput.value.replace(/[^\d]/g, '');
    phoneInput.value = formatPhoneNumber(numbers);
    // Set the cursor position to the end of the input
    phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
    updateInputValidity(phoneInput, phoneLabel);
}

/**
 * This function sets the cursor position to the end of the input whenever the input field is clicked.
 * 
 * @param {*HTMLInputElement} phoneInput            :           The phone input DOM element whose validity is to be updated.
 */
function handleClickEvent(phoneInput) {
    phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
}

/**
 * This function sets the cursor position to the end of the input when the field gains focus. 
 * The cursor position is set after a brief delay (using setTimeout) to ensure the action occurs after the default browser focus behavior.
 * 
 * @param {*HTMLInputElement} phoneInput            :           The phone input DOM element whose validity is to be updated.
 */
function handleFocusEvent(phoneInput) {
    window.setTimeout(() => {
        phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
    }, 0);
}

/**
 * Adds multiple event listeners to a given phone input element. 
 * 'keydown', 'input', 'click', and 'focus'
 * 
 * @param {object} FormElements          :           An object representing the form, which contains the phone input element.
 *                                                   It should have a property 'inputUserPhone' that refers to the actual DOM element.
 */
function addPhoneInputEventListeners(FormElements) {
    const phoneInput = FormElements.inputUserPhone;
    const phoneLabel = FormElements.labelUserPhone;
    if (!phoneInput) return;
    phoneInput.addEventListener('keydown', (e) => handleKeyDownEvent(e, phoneInput, phoneLabel));
    phoneInput.addEventListener('input', () => handleInputEvent(phoneInput, phoneLabel));
    phoneInput.addEventListener('click', () => handleClickEvent(phoneInput));
    phoneInput.addEventListener('focus', () => handleFocusEvent(phoneInput));
}

/********************************************************
 *              Functions to handle e-mail              *
 ********************************************************/

/**
 * Handles changes to the email input field and updates the styling based on its content.
 * This function checks whether the email input is not empty and if it's in a valid format.
 * If the input is not empty and is valid, the text color is set to white; otherwise, it's set to red.
 * It also adjusts the position of the associated label based on whether the input is empty.
 *
 * @param {object} FormElements             :            An object containing references to various form elements,
 *                                                       including the email input and its label.
 *                                                       Expected to have 'inputUserEmail' and 'labelUserEmail' properties.
 */
function handleEmailInput(FormElements) {
    var emailInput = FormElements.inputUserEmail;
    var emailLabel = FormElements.labelUserEmail;
    var isNotEmpty = emailInput.value.trim() !== '';
    emailInput.style.color = isNotEmpty && !emailInput.validity.typeMismatch ? 'white' : '#ca3b3b';

    if (isNotEmpty) {
        updateLabelStyle(emailLabel, '-25px', '5px', 'var(--effect-color)', 'var(--form-font-size-focus)');
    }
    else {
        updateLabelStyle(emailLabel, '0px', '0px', 'white', 'var(--form-font-size)');
    }
}

/**
 * Adds an 'input' event listener to the email input field within the provided form element object.
 * 
 * @param {object} formElement          :            An object representing the form, which should contain
 *                                                   the email input field. It's expected to have an 'inputUserEmail'
 *                                                   property that refers to the actual DOM element.
 */
function addEmailInputEventListener(FormElements) {
    var emailInput = FormElements.inputUserEmail;
    if (!emailInput) return;
    emailInput.addEventListener('input', () => handleEmailInput(FormElements));
}

/********************************************************
 *      Functions to handle file upload/download        *
 ********************************************************/

/**
 * Displays the name of the uploaded file and creates a downloadable link for it.
 * If a file is selected and uploaded through the input field, this function updates
 * the text content of the provided download link with the file's name, sets the href
 * attribute to a blob URL representing the file, and makes the link visible.
 *
 * @param {HTMLInputElement} input          :           The input element of type 'file' from which the file is uploaded.
 * @param {HTMLElement} downloadLink        :           The element (typically an anchor tag) where the file name and download link will be displayed.
 */
function displayUploadedFile(input, downloadLink) {
    const file = input.files[0];
    if (file) {
        downloadLink.textContent = file.name;
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.style.display = 'inline-block';
    }
}

/**
 * Sets up an event listener for a 'change' event on a file input element. When a new file
 * is selected through the input, the 'displayUploadedFile' function is called to update
 * the provided link element with the details of the uploaded file. This typically involves
 * displaying the file name and creating a downloadable link.
 *
 * @param {HTMLInputElement} inputElement           :            The file input element to which the 'change' event listener will be added.
 * @param {HTMLElement} linkElement                 :            The element (typically an anchor tag) that will display the uploaded file's name and provide a download link.
 */
function setupFileInputListener(inputElement, linkElement) {
    inputElement.addEventListener('change', () => {
        displayUploadedFile(inputElement, linkElement);
    });
}

/**
 * Sets up file input listeners for specified elements within a form. This function checks
 * if the form has specified elements for a CV and a cover letter. If these elements exist,
 * it applies 'change' event listeners to them, which will trigger the display of the uploaded file's
 * name and a download link when a file is selected.
 *
 * @param {object} FormElements             :            An object containing references to various form elements.
 *                                                       This should include 'inputFile_Cv' and 'downloadLink_Cv' for the CV upload,
 *                                                       as well as 'inputFile_CoverLetter' and 'downloadLink_CoverLetter' for the cover letter upload.
 */
function setupFormFileInputs(FormElements) {
    if (FormElements.inputFile_Cv && FormElements.downloadLink_Cv) {
        setupFileInputListener(FormElements.inputFile_Cv, FormElements.downloadLink_Cv);
    }
    if (FormElements.inputFile_CoverLetter && FormElements.downloadLink_CoverLetter) {
        setupFileInputListener(FormElements.inputFile_CoverLetter, FormElements.downloadLink_CoverLetter);
    }
}

/********************************************************
 *          Functions to handle submit button           *
 ********************************************************/

/**
 * Clears the file input fields and resets the download links within the form.
 * This function sets the value of each file input element to an empty string
 * and resets the text and href of associated download links, effectively 
 * removing any selected files and waiting for new files.
 *
 * @param {object} FormElements             -            An object containing references to form elements,
 *                                                       including file inputs and download links that need to be cleared.
 */
function clearFileInputs(FormElements) {
    if (FormElements.inputFile_Cv) {
        FormElements.inputFile_Cv.value = '';
        if (FormElements.downloadLink_Cv) {
            FormElements.downloadLink_Cv.href = '';
            FormElements.downloadLink_Cv.textContent = 'No file selected';
            FormElements.downloadLink_Cv.style.display = 'none';
        }
    }
    if (FormElements.inputFile_CoverLetter) {
        FormElements.inputFile_CoverLetter.value = '';
        if (FormElements.downloadLink_CoverLetter) {
            FormElements.downloadLink_CoverLetter.href = '';
            FormElements.downloadLink_CoverLetter.textContent = 'No file selected';
            FormElements.downloadLink_CoverLetter.style.display = 'none';
        }
    }
}

/**
 * Resets the styling of the email input's label based on the current content of the email field.
 * If the email input is not empty, the label is moved to a higher position (-25px).
 * If the email input is empty, the label is moved back to its original position (0px).
 * This can be particularly useful for forms with floating labels that need to adjust
 * based on whether the user has entered text into the input field.
 *
 * @param {object} FormElements             -            An object containing references to various form elements,
 *                                                       including the email input and its associated label.
 *                                                       Expected to have 'inputUserEmail' and 'labelUserEmail' properties.
 */
function resetEmailInput(FormElements) {
    var isNotEmpty = FormElements.inputUserEmail.value.trim() !== '';
    var label = FormElements.labelUserEmail;
    label.style.top = isNotEmpty ? '-25px' : '0px';
}

/**
 * Clears all the input fields within the form specified by FormElements. This function resets
 * the values of text inputs and other field types to their default state (generally an empty string).
 * It also calls specific functions to reset complex inputs like file uploads and adjust the styling
 * of floating labels for email inputs. This is particularly useful for resetting the form after a submit
 * operation or when initializing the form to ensure all fields are in a clean state.
 *
 * @param {object} FormElements             -            An object containing references to the various form elements.
 *                                                       It should have properties corresponding to each input field in the form,
 *                                                       such as 'inputUserName', 'inputUserPhone', 'inputUserEmail', etc.
 */
function clearForm(FormElements) {
    if (FormElements.inputUserName) FormElements.inputUserName.value = '';
    if (FormElements.inputUserPhone) FormElements.inputUserPhone.value = '';
    if (FormElements.inputUserEmail) FormElements.inputUserEmail.value = '';
    if (FormElements.inputUserEmail) resetEmailInput(FormElements);
    if (FormElements.inputApplicationDepartment) FormElements.inputApplicationDepartment.value = '';
    clearFileInputs(FormElements);
    if (FormElements.inputUserCompany) FormElements.inputUserCompany.value = '';
    if (FormElements.inputSubject) FormElements.inputSubject.value = '';
    if (FormElements.inputExplanation) FormElements.inputExplanation.value = '';
    if (FormElements.inputUserMessageType) FormElements.inputUserMessageType.value = '';

}

/**
 * Displays a loading spinner for a given form.
 * This function takes an object containing form elements and sets the display style of the loading spinner to 'inline-block', making it visible to the user. 
 * This is typically used to indicate that a process is ongoing after the user has interacted with the form.
 * 
 * @param {object} FormElements             -           An object containing references to the various form elements
 */
function startSpinner(FormElements) {
    FormElements.loadingSpinner.style.display = 'inline-block';
}

/**
 * Toggles the 'load-complete' class for the loading spinner in a form.
 *
 * This function is used to indicate the completion of a loading process. 
 * It takes an object containing form elements and toggles the 'load-complete' class on the loading spinner element. 
 * This can be used to change the appearance of the spinner, typically to signify that the action the user initiated has been successfully completed.
 *
 * @param {object} FormElements             -           An object containing references to the various form elements
 */
function successSpinner(FormElements) {
    FormElements.loadingSpinner.classList.toggle("load-complete");
}

/**
 * Hides the loading spinner in a form, typically used to indicate a failure or end of a process.
 *
 * This function takes an object containing form elements and sets the display style of the loading spinner to 'none', effectively hiding it from the user's view. 
 * This is commonly used in scenarios where a process that the user has initiated has either failed or come to an end without a success state, 
 * and there is no longer a need to show a loading indication.
 *
 * @param {object} FormElements             -           An object containing references to the various form elements
 */
function failedSpinner(FormElements) {
    FormElements.loadingSpinner.style.display = 'none';
}

/**
 * Checks if all form elements have values that are not just whitespace.
 *
 * This function iterates through each element in an object representing form elements. 
 * It checks if each element has a value and if that value is not just whitespace. 
 * If any element has an empty value or a value consisting only of whitespace, the function logs that element to the console and returns false,
 * indicating that the form validation failed. If all elements have valid, non-whitespace values, the function returns true, indicating successful validation.
 *
 * @param {object} FormElements             -           An object containing references to the various form elements
 */
function checkForm(FormElements) {
    for (let key in FormElements) {
        let element = FormElements[key];
        if (element && element.value !== undefined) {
            if (!element.value.trim()) {
                console.log(element);
                return false;
            }
        }
    }
    return true;
}

/**
 * Adds a 'click' event listener to the submit button within the provided form elements object.
 * When the submit button is clicked, it triggers the 'clearForm' function to reset all input
 * fields in the form. This is useful for implementing custom behavior when the submit button
 * is clicked, such as clearing the form after submission or preparing the form for a new entry.
 *
 * @param {object} FormElements             -           An object containing references to the various form elements,
 *                                                      including the submit button. Expected to have a 'buttonSubmit'
 *                                                      property that refers to the actual submit button DOM element.
 */
function addButtonSubmitEventListener(FormElements) {
    if (FormElements.buttonSubmit) {
        FormElements.buttonSubmit.addEventListener('click', () => {
            if (checkForm(FormElements)) {
                if (pageName === 'contact' || pageName === "iletisim") {
                    const businessInquiryData = {
                        name_surname: FormElements.inputUserName.value,
                        phone_no: FormElements.inputUserPhone.value,
                        mail: FormElements.inputUserEmail.value,
                        company: FormElements.inputUserCompany.value,
                        subject: FormElements.inputSubject.value,
                        explanation: FormElements.inputExplanation.value
                    };
                    console.log(businessInquiryData);
                    sendJSONDataToEndpoint(FormElements, 'https://nestyazilim.com:8080/businessInquiry', businessInquiryData);
                }
                else if (pageName === 'career' || pageName === "kariyer") {
                    const form = document.getElementById('applicationForm');
                    const formData = new FormData(form);
                    console.log(form);
                    sendFormDataToEndPoint(FormElements, 'https://nestyazilim.com:8080/careerApplication', formData);
                }
                else if (pageName === 'support' || pageName === "destek") {
                    const supportInquiry = {
                        mail: FormElements.inputUserEmail.value,
                        issue: FormElements.inputUserMessageType.value,
                        subject: FormElements.inputSubject.value,
                        explanation: FormElements.inputExplanation.value
                    };
                    sendJSONDataToEndpoint(FormElements, 'https://nestyazilim.com:8080/supportRequest', supportInquiry);
                }
            }else{
                alert("Please fill in all blank fields!");
            }
        });
    }
}/**
 * Asynchronously sends JSON data to a specified URL endpoint. It manages UI feedback during the request process using spinner functions and clears the form upon successful data submission.
 * 
 * @async
 * @function sendJSONDataToEndpoint
 * @param {HTMLElement[]} FormElements - An array or collection of HTML elements associated with a form. These elements are used for showing and hiding spinners.
 * @param {string} url - The URL to which the data should be sent.
 * @param {Object} data - The data object that will be sent to the server. This object will be stringified to JSON format.
 * @throws {Error} Throws an error if the request to the server fails.
 * @description
 * This function performs the following steps:
 * 1. Starts a spinner to indicate that the data sending process has started.
 * 2. Sends a POST request with JSON data to the specified URL.
 * 3. On successful response (HTTP status code 200-299), logs the server's response, shows a success spinner, and clears the form.
 * 4. On failure (any other HTTP status code), shows a failure spinner and throws an error.
 * 5. Catches and logs any errors that occur during the fetch operation or response handling.
 */ 
async function sendJSONDataToEndpoint(FormElements, url, data) {
    try {
        startSpinner(FormElements);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            successSpinner(FormElements);
            clearForm(FormElements);
        } else {
            failedSpinner(FormElements);
            throw new Error('Request failed.');
        }
    } catch (error) {
        failedSpinner(FormElements);
        console.error('Error:', error);
    }
}

/**
 * Asynchronously sends form data to a specified URL endpoint. It manages UI feedback during the request process with spinner functions and clears the form upon successful submission.
 *
 * @async
 * @function sendFormDataToEndPoint
 * @param {HTMLElement[]} FormElements - An array or collection of HTML elements associated with a form. These elements are used for showing and hiding spinners.
 * @param {string} url - The URL to which the form data should be sent.
 * @param {FormData} formData - The FormData object containing the data to be sent. This is typically obtained from a form element.
 * @throws {Error} Throws an error with the HTTP status code if the request to the server fails.
 * @description
 * This function performs the following steps:
 * 1. Starts a spinner to indicate that the form submission process has started.
 * 2. Sends a POST request with the FormData to the specified URL.
 * 3. Checks the response: on success, logs the server response, shows a success spinner, and clears the form; on failure, shows a failure spinner and throws an error with the response status.
 * 4. Catches and logs any errors that occur during the fetch operation or response handling.
 */
async function sendFormDataToEndPoint(FormElements, url, formData) {
    try {
        startSpinner(FormElements);
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            successSpinner(FormElements);
            clearForm(FormElements);
        } else {
            failedSpinner(FormElements);
            throw new Error('Request failed.');
        }
    } catch (error) {
        failedSpinner(FormElements);
        console.error('Error:', error);
    }
}

/********************************************************
 *                Add Event listeners                   *  
 ********************************************************/
document.addEventListener('DOMContentLoaded', () => {
    if (pageName === 'career' || pageName === "kariyer") {
        addPhoneInputEventListeners(FormElementsCareer);
        addEmailInputEventListener(FormElementsCareer);
        addButtonSubmitEventListener(FormElementsCareer);
        setupFormFileInputs(FormElementsCareer);
    }
    else if (pageName === 'contact' || pageName === "iletisim") {
        addButtonSubmitEventListener(FormElementsContact);
        addEmailInputEventListener(FormElementsContact);
        addPhoneInputEventListeners(FormElementsContact);
    } else if (pageName === 'support' || pageName === "destek") {
        addEmailInputEventListener(FormElementsSupport);
        addButtonSubmitEventListener(FormElementsSupport);
    }
});

