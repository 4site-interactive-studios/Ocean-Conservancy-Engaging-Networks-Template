window._NBSettings = {
    apiKey: 'public_45feb67a2317d1f97b59ba35cc2b7118',
    autoFieldHookup: false,
    inputLatency: 500,
    displayPoweredBy: false,
    loadingMessage: "Validating...",
    softRejectMessage: "Invalid email",
    acceptedMessage: "Email validated!",
    feedback: false,
};
var email_field_id = 'en__field_supporter_emailAddress';

// Boolean value that can be checked by other scripts
window.en_nb_valid_email = true;

// Function to insert HTML after a DIV
function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

// Function to insert HTML before a DIV
function insertBefore(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode);
}

// Function to Wrap HTML around a DIV
function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}

// Searh page for Email field and set as variable
var nb_email_field = document.getElementById(email_field_id);
if (nb_email_field) {

    window.en_nb_valid_email = false;

    // Wrap Email field in targetable div      
    wrap(nb_email_field, document.createElement('div'));
    nb_email_field.parentNode.id = "nb-wrapper"; 

    // Define HTML structure for a Custom NB Message and insert it after Email field
    var nbCustomMessageHTML = document.createElement('div');
    nbCustomMessageHTML.innerHTML = '<div id="nb-feedback" class="nb-feedback nb-hidden">Enter a valid email.</div>';
    insertAfter(nbCustomMessageHTML, nb_email_field);   

    // Search page for the NB Wrapper div and set as variable
    var nb_email_field_wrapper = document.getElementById("nb-wrapper");

    // Search page for the NB Feedback div and set as variable
    var nb_email_feedback_field = document.getElementById("nb-feedback");  

    //var outer_field_wrapper = nb_email_field_wrapper.parentNode.parentNode;

    // classes to add or remove based on neverbounce results
    var nb_email_field_wrapper_success = 'nb-success';
    var nb_email_field_wrapper_error = 'nb-error';
    var nb_email_feedback_hidden = 'nb-hidden';
    var nb_email_feedback_loading = 'nb-loading';
    var nb_email_field_error = 'rm-error';
    //var field_wrapper_error_class = 'en__field__error-wrapper';

    function setEmailStatus(status) {
        var existing_errors = nb_email_field_wrapper.parentNode.parentNode.getElementsByClassName('en__field__error');
        if(existing_errors.length) {
            // remove the existing default error and replace with one that fits in this custom framework
            nb_email_field_wrapper.parentNode.parentNode.removeChild(existing_errors.item(0));            
            status = 'required'; // special case status that we created, not NB
        }

        if(status == 'valid') {

            window.en_nb_valid_email = true;

            nb_email_field.classList.remove(nb_email_field_error);

            nb_email_feedback_field.innerHTML = 'Email Validated!';
            nb_email_feedback_field.classList.remove(nb_email_feedback_hidden);
            nb_email_feedback_field.classList.remove(nb_email_feedback_loading);
            nb_email_field_wrapper.classList.remove(nb_email_field_wrapper_error); 
            nb_email_field_wrapper.classList.add(nb_email_field_wrapper_success);

            //window.clearAllErrors(window.getFieldWrapper(nb_email_field).parentNode);
            //outer_field_wrapper.classList.remove(field_wrapper_error_class);

        } else {

            window.en_nb_valid_email = false;
            nb_email_field_wrapper.classList.remove(nb_email_field_wrapper_success);            
            nb_email_field_wrapper.classList.add(nb_email_field_wrapper_error);

            switch(status) {
                case 'required': // special case status that we added ourselves -- doesn't come from NB
                    nb_email_feedback_field.innerHTML = 'Email is required';
                    nb_email_feedback_field.classList.remove(nb_email_feedback_loading);
                    nb_email_feedback_field.classList.remove(nb_email_feedback_hidden);
                    nb_email_field.classList.add(nb_email_field_error);
                    break;
                case 'soft-result':
                    if(nb_email_field.value) {
                        nb_email_feedback_field.innerHTML = 'Invalid email';
                        nb_email_feedback_field.classList.remove(nb_email_feedback_hidden);
                    } else {
                        nb_email_feedback_field.innerHTML = '';
                        nb_email_feedback_field.classList.add(nb_email_feedback_hidden);
                    }
                    nb_email_feedback_field.classList.remove(nb_email_feedback_loading);
                    nb_email_field.classList.add(nb_email_field_error);
                    //outer_field_wrapper.classList.add(field_wrapper_error_class);
                    break;
                case 'invalid':
                    nb_email_feedback_field.innerHTML = 'Invalid email';
                    nb_email_feedback_field.classList.remove(nb_email_feedback_loading);
                    nb_email_feedback_field.classList.remove(nb_email_feedback_hidden);
                    nb_email_field.classList.add(nb_email_field_error);
                    //outer_field_wrapper.classList.add(field_wrapper_error_class);
                    //window.clearAllErrors(window.getFieldWrapper(nb_email_field).parentNode);
                    break;
                case 'loading':
                    nb_email_feedback_field.innerHTML = 'Email being verified';
                    nb_email_feedback_field.classList.add(nb_email_feedback_loading);
                    nb_email_feedback_field.classList.remove(nb_email_feedback_hidden);
                    nb_email_field.classList.remove(nb_email_field_error);
                    //outer_field_wrapper.classList.remove(field_wrapper_error_class);
                   break;
                case 'clear':
                    break;
                default:
                    break;
            }

        }
    }

    (function() { window.addEventListener('load', function() {
        document.querySelector('body').addEventListener('nb:registered', function (event) {

            var field = document.querySelector('[data-nb-id="' + event.detail.id + '"]');     

            // Never Bounce: Do work when input changes or when API responds with an error                  
            field.addEventListener('nb:clear', function(e) {
                setEmailStatus('clear');
            });

            // Never Bounce: Do work when waiting for results  
            field.addEventListener('nb:loading', function(e) {
                setEmailStatus('loading');
            });  
    
            // Never Bounce: Do work when results have an input that does not look like an email (i.e. missing @ or no .com/.net/etc...)
            field.addEventListener('nb:soft-result', function(e) {
                setEmailStatus('soft-result');
            });    

            // Never Bounce: When results have been recieved
            field.addEventListener('nb:result', function(e) {
                if (e.detail.result.is(_nb.settings.getAcceptedStatusCodes())) {
                    setEmailStatus('valid');
                } else {
                    setEmailStatus('invalid');
                }
            });    

        }); 
        
        // Never Bounce: Register field with the widget and broadcast nb:registration event
        _nb.fields.registerListener(nb_email_field, true);

    }); })();
}